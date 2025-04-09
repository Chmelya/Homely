using Homely.Domain.Constants.Rbac;
using Homely.Domain.Entities.Rbac;

namespace Homely.Infrastructure.Data.Configurations.Rbac.Enities;

internal static class PermissionEntities
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

    public static Permission RequestEditOnlyOwner = new()
    {
        Id = 4,
        Name = Permissions.RequestEditOnlyOwner,
    };

    public static List<Permission> AdminPermissions = GetAllPermissions();

    public static List<Permission> ResidentPermissions =
    [
        RequestWrite,
        RequestRead,
        RequestEditOnlyOwner
    ];

    public static List<Permission> GetAllPermissions()
    {
        var permissions = typeof(PermissionEntities)
                   .GetFields()
                   .Where(f => f.FieldType == typeof(Permission))
                   .Select(f => f.GetValue(null) as Permission)
                   .Where(f => f is not null)
                   .Select(f => f!)
                   .ToList();

        return permissions;
    }
}