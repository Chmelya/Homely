using Homely.Application.ServiceRequests.Response;
using Homely.Domain.Entities.Business;
using System.Linq.Expressions;
using X.PagedList;

namespace Homely.Application.Common.Interfaces.Repositories;

public interface IServiceRequestRepository : IBaseRepository<ServiceRequest>
{
    Task<IPagedList<ServiceRequestResponse>> GetPagedAsync(int pageNumber, int pageSize, Expression<Func<ServiceRequest, bool>>? predicate = null, bool isAsNoTracking = false, CancellationToken cancellationToken = default);

    Task<ServiceRequest?> GetWithDetails(Expression<Func<ServiceRequest, bool>> predicate, bool isAsNoTracking = false, CancellationToken cancellationToken = default);
}