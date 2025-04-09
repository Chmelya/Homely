using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Homely.Infrastructure.Data.Repositories;

public class UserRepository(ApplicationDbContext context) : BaseRepository<User>(context), IUserRepository
{
    public async Task<User?> GetWithRole(
        Expression<Func<User, bool>> predicate,
        CancellationToken cancellationToken = default)

    {
        return await Get(isAsNoTracking: true)
            .Include(u => u.Role)
            .FirstOrDefaultAsync(predicate, cancellationToken: cancellationToken);
    }
}