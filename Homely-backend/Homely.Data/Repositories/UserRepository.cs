using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Domain.Entities.Common;
using Homely.Domain.Rbac;

namespace Homely.Infrastructure.Data.Repositories;

public class UserRepository(ApplicationDbContext context) : BaseRepository<User>(context), IUserRepository
{
    public async Task AddUser(User user)
    {
        user.Role = RbacEntities.Resident;

        await AddAsync(user);
    }
}