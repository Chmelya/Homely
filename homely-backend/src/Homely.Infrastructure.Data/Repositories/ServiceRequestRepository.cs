using Homely.Application.Common.Filters;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Extensions;
using Homely.Application.Models.ServiceRequests.Response;
using Homely.Domain.Entities.Business;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using X.PagedList;
using X.PagedList.EF;
using X.PagedList.Extensions;

namespace Homely.Infrastructure.Data.Repositories;

public class ServiceRequestRepository(ApplicationDbContext context)
    : BaseRepository<ServiceRequest>(context),
    IServiceRequestRepository
{
    public async Task<ServiceRequest?> GetWithDetails(
        Expression<Func<ServiceRequest, bool>> predicate,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        return await Get(isAsNoTracking)
            .Include(r => r.Details)
            .FirstOrDefaultAsync(predicate, cancellationToken);
    }

    public async Task<IPagedList<ServiceRequestResponse>> GetPagedAsync(
        ServiceRequestFilter filter,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        var query = GetAsSplitable(isAsNoTracking);

        query = ApplyFilters(query, filter);

        var responseQuery = query.Select(request => new ServiceRequestResponse()
        {
            RequestId = request.Id,
            Title = request.Title,
            CreatorId = request.CreatorId,
            AdministratorId = request.AdministratorId,
            StatusId = (int)request.Status,
            UrgencyId = (int)request.Urgency,
            CategoryId = (int)request.Category,
            StatusName = request.Status.GetDescription(),
            UrgencyName = request.Urgency.GetDescription(),
            CategoryName = request.Category.GetDescription(),
            CreatedDate = ((DateTimeOffset)request.CreatedAt).ToUnixTimeMilliseconds()
        });

        var pagedList = await responseQuery.ToPagedListAsync(filter.PageNumber, filter.PageSize);

        return pagedList;
    }

    private static IQueryable<ServiceRequest> ApplyFilters(IQueryable<ServiceRequest> query, ServiceRequestFilter filter)
    {
        query = FilterQuery(query, filter);

        if (filter.SortColumn is null
           && filter.SortOrder is null)
        {
            return query.OrderByDescending(sr => sr.CreatedAt);
        }

        var orderSelector = GetOrderSelector(filter.SortColumn);

        query = ApplySort(query, filter.SortOrder, orderSelector);

        return query;
    }

    private static IQueryable<ServiceRequest> FilterQuery(IQueryable<ServiceRequest> query, ServiceRequestFilter filter)
    {
        if (filter.UserId is not null)
        {
            query = query.Where(sr => sr.CreatorId == filter.UserId);
        }

        if (filter.Statuses is not null)
        {
            query = query.Where(sr => filter.Statuses.Contains(sr.Status));
        }

        if (filter.Categories is not null)
        {
            query = query.Where(sr => filter.Categories.Contains(sr.Category));
        }

        if (filter.Urgencies is not null)
        {
            query = query.Where(sr => filter.Urgencies.Contains(sr.Urgency));
        }

        return query;
    }

    private static Expression<Func<ServiceRequest, object>> GetOrderSelector(string? sortColumn)
    {
        return sortColumn?.ToUpperInvariant() switch
        {
            FilterConstants.Date => request => request.CreatedAt,
            FilterConstants.Urgency => request => request.Urgency,
            FilterConstants.Category => request => request.Category,
            FilterConstants.Status => request => request.Status,
            FilterConstants.Title => request => request.Title,
            _ => request => request.CreatedAt,
        };
    }

    private static IQueryable<ServiceRequest> ApplySort(
        IQueryable<ServiceRequest> query, string? sortOrder, Expression<Func<ServiceRequest, object>> orderSelector)
    {
        return sortOrder?.ToUpperInvariant() switch
        {
            FilterConstants.Descendant => query.OrderByDescending(orderSelector),
            FilterConstants.Acscendant => query.OrderBy(orderSelector),
            _ => query.OrderBy(orderSelector)
        };
    }
}