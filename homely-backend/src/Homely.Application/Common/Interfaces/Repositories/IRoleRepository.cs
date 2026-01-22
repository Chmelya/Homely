using Homely.Domain.Entities.Rbac;
using System.Linq.Expressions;

namespace Homely.Application.Common.Interfaces.Repositories;

public interface IRoleRepository : IBaseRepository<Role>
{
    Task<Role?> GetWithPermissionsAsync(
        Expression<Func<Role, bool>> predicate,
        CancellationToken cancellationToken = default);
}