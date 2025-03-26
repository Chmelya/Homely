using Homely.Domain.Entities.Rbac;
using Homely.Domain.Rbac;
using Microsoft.EntityFrameworkCore;

namespace Homely.Infrastructure.Data.Configurations.Rbac;

internal static class RbacSeed
{
    public static void SeedRolesPermissions(this ModelBuilder modelBuilder)
    {
        var permissions = RbacEntities.GetAllPermissions();
        modelBuilder.Entity<Permission>().HasData(permissions);

        var roles = RbacEntities.GetAllRoles();
        modelBuilder.Entity<Role>().HasData(roles);

        var realations = RbacEntities.GetRolePermissonRelations();
        modelBuilder
            .Entity<Role>()
            .HasMany(r => r.Permissions)
            .WithMany(p => p.Roles)
            .UsingEntity("PermissionRole")
            .HasData(realations);
    }
}