using Homely.Domain.Entities.Rbac;
using Homely.Infrastructure.Data.Configurations.Rbac.Enities;
using Microsoft.EntityFrameworkCore;

namespace Homely.Infrastructure.Data.Configurations.Rbac;

internal static class RbacSeed
{
    public static void SeedRolesPermissions(this ModelBuilder modelBuilder)
    {
        var permissions = PermissionEntities.GetAllPermissions();
        modelBuilder.Entity<Permission>().HasData(permissions);

        var roles = RoleEntities.GetAllRoles();
        modelBuilder.Entity<Role>().HasData(roles);

        var realations = RolePermissionEnities.GetRolePermissonRelationsEnities();
        modelBuilder
            .Entity<Role>()
            .HasMany(r => r.Permissions)
            .WithMany(p => p.Roles)
            .UsingEntity("PermissionRole")
            .HasData(realations);
    }
}