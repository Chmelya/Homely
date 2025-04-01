using Homely.Domain.Entities.Rbac;

namespace Homely.Infrastructure.Identification.Authentication.Interfaces;

public interface IPermissionRepository
{
    Task<List<Permission>> GetPermissionsAsync(int RoleId);
}