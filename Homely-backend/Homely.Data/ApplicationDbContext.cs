using Homely.Domain.Entities;
using Homely.Domain.Entities.Rbac;
using Microsoft.EntityFrameworkCore;

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

    //public DbSet<ServiceRequest> ServiceRequests { get; set; }

    //public DbSet<ServiceRequestDetails> ServiceRequestDetails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}