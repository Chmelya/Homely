using Homely.Domain.Entities.Rbac;

namespace Homely.Infrastructure.Data.Configurations.Rbac.Enities;

internal static class RolePermissionEnities
{
    private static List<(int, List<Permission>)> RolesPermisssions = new()
    {
        (RoleEntities.Admin.Id, PermissionEntities.AdminPermissions),
        (RoleEntities.Resident.Id, PermissionEntities.ResidentPermissions),
    };

    public static List<object> GetRolePermissonRelationsEnities()
    {
        return RolesPermisssions
            .SelectMany(
                r => r.Item2,
                (r, permission) => new { RolesId = r.Item1, PermissionsId = permission.Id })
            .ToList<object>();
    }
}