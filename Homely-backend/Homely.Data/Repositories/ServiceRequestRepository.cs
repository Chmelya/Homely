using Azure.Core;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.ServiceRequests.Response;
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
        int pageNumber,
        int pageSize,
        Expression<Func<ServiceRequest, bool>>? predicate = null,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        var query = GetAsSplitable(isAsNoTracking);

        if (predicate is not null)
        {
            query = query.Where(predicate);
        }

        var responseQuery = query.Select(request => new ServiceRequestResponse()
        {
            RequestId = request.Id,
            Title = request.Title,
            CreatorId = request.CreatorId,
            AdministratorId = request.AdministratorId,
            Status = (int)request.Status,
            Urgency = (int)request.Urgency,
            Category = (int)request.Category
        });

        var pagedList = await responseQuery.ToPagedListAsync(pageNumber, pageSize);
        
        return pagedList;
    }
}