using Homely.Domain.Entities.Business;
using System.Linq.Expressions;

namespace Homely.Application.Common.Interfaces.Repositories;

public interface IServiceRequestRepository : IBaseRepository<ServiceRequest>
{
    Task<ServiceRequest?> GetWithDetails(Expression<Func<ServiceRequest, bool>> predicate, bool isAsNoTracking = false, CancellationToken cancellationToken = default);
}