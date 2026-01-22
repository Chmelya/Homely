using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Rbac;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Homely.Infrastructure.Data.Repositories;

public class RoleRepository(ApplicationDbContext context) : BaseRepository<Role>(context), IRoleRepository
{
    public async Task<Role?> GetWithPermissionsAsync(
        Expression<Func<Role, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        return await Get(isAsNoTracking: true)
            .Include(r => r.Permissions)
            .FirstOrDefaultAsync(predicate, cancellationToken);
    }
}