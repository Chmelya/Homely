using Homely.Domain.Entities.Rbac;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homely.Infrastructure.Data.Configurations.Rbac;

internal class Categories : IEntityTypeConfiguration<Permission>
{
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
        builder
            .HasIndex(p => p.Name)
            .IsUnique();
    }
}