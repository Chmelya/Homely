using Homely.Domain.Constants.Rbac;
using Homely.Domain.Entities.Rbac;
using Homely.Domain.Entities.RelationEntities;
using System.Reflection;

namespace Homely.Domain.Rbac;

public static class RbacEntities
{
    public static Permission RequestWrite = new()
    {
        Id = 1,
        Name = Permissions.RequestWrite,
    };

    public static Permission RequestRead = new()
    {
        Id = 2,
        Name = Permissions.RequestRead,
    };

    public static Permission RequestEdit = new()
    {
        Id = 3,
        Name = Permissions.RequestEdit,
    };

    private static List<Permission> AdminPermissions = GetAllPermissions();

    private static List<Permission> ResidentPermissions =
    [
        RequestWrite,
        RequestRead
    ];

    public static Role Admin = new()
    {
        Id = 1,
        Name = Roles.Admin,
    };

    public static Role Resident = new()
    {
        Id = 2,
        Name = Roles.Resident,
    };

    private static List<(int, List<Permission>)> RolesPermisssions = new()
    {
        (Admin.Id, AdminPermissions),
        (Resident.Id, ResidentPermissions),
    };

    public static List<object> GetRolePermissonRelations()
    {
        return RolesPermisssions
            .SelectMany(
                r => r.Item2,
                (r, permission) => new { RolesId = r.Item1, PermissionsId = permission.Id })
            .ToList<object>();
    }

    public static List<Permission> GetAllPermissions()
    {
        var permissions = typeof(RbacEntities)
                   .GetFields()
                   .Where(f => f.FieldType == typeof(Permission))
                   .Select(f => f.GetValue(null) as Permission)
                   .Where(f => f is not null)
                   .Select(f => f!)
                   .ToList();

        return permissions;
    }

    public static List<Role> GetAllRoles()
    {
        var roles = typeof(RbacEntities)
                   .GetFields()
                   .Where(f => f.FieldType == typeof(Role))
                   .Select(f => f.GetValue(null) as Role)
                   .Where(f => f is not null)
                   .Select(f => f!)
                   .ToList();

        return roles;
    }
}