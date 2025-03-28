using Homely.Domain.Entities;
using Homely.Domain.Entities.Business;
using Homely.Domain.Entities.Rbac;
using Homely.Infrastructure.Data.Configurations.Rbac;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Homely.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Role> Roles { get; set; }

    public DbSet<Permission> Permissions { get; set; }

    public DbSet<ServiceRequest> ServiceRequests { get; set; }

    //public DbSet<ServiceRequestDetails> ServiceRequestDetails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        modelBuilder.SeedRolesPermissions();

        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}