using Homely.Domain.Constants.Rbac;
using Homely.Domain.Entities.Rbac;

namespace Homely.Infrastructure.Data.Configurations.Rbac.Enities;

internal static class RoleEntities
{
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

    public static List<Role> GetAllRoles()
    {
        var roles = typeof(RoleEntities)
                   .GetFields()
                   .Where(f => f.FieldType == typeof(Role))
                   .Select(f => f.GetValue(null) as Role)
                   .Where(f => f is not null)
                   .Select(f => f!)
                   .ToList();

        return roles;
    }
}