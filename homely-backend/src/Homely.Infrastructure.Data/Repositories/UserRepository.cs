using System.Linq.Expressions;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Models.Authentication.Requests;
using Homely.Domain.Entities.Common;
using Homely.Infrastructure.Data.Configurations.Rbac.Enities;
using Microsoft.EntityFrameworkCore;

namespace Homely.Infrastructure.Data.Repositories;

public class UserRepository(ApplicationDbContext context) : BaseRepository<User>(context), IUserRepository
{
    public async Task AddResident(SignUpRequest request, string password)
    {
        var newResident = new User()
        {
            Email = request.Email,
            Password = password,
            FirstName = request.FirstName,
            MiddleName = request.MiddleName,
            LastName = request.LastName,
            RoleId = RoleEntities.Resident.Id,
        };

        await AddAsync(newResident);
    }

    public async Task<User?> GetWithRole(
        Expression<Func<User, bool>> predicate,
        CancellationToken cancellationToken = default)

    {
        return await Get(isAsNoTracking: true)
            .Include(u => u.Role)
            .FirstOrDefaultAsync(predicate, cancellationToken: cancellationToken);
    }
}