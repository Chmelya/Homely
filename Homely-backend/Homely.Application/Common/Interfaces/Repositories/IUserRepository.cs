using Homely.Domain.Entities.Common;
using System.Linq.Expressions;

namespace Homely.Application.Common.Interfaces.Repositories;

public interface IUserRepository : IBaseRepository<User>
{
    Task<User?> GetWithRole(Expression<Func<User, bool>> predicate, CancellationToken cancellationToken = default);
}