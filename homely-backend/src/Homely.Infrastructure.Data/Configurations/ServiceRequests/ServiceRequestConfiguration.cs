using Homely.Domain.Entities.Business;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homely.Infrastructure.Data.Configurations.ServiceRequests;

internal class ServiceRequestConfiguration : IEntityTypeConfiguration<ServiceRequest>
{
    public void Configure(EntityTypeBuilder<ServiceRequest> builder)
    {
        builder
            .HasOne(sr => sr.Details)
            .WithOne(d => d.ServiceRequest)
            .HasForeignKey<ServiceRequestDetails>(d => d.ServiceRequestId);

        builder
            .HasOne(sr => sr.Creator)
            .WithMany()
            .HasForeignKey(sr => sr.CreatorId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(sr => sr.Administrator)
            .WithMany()
            .HasForeignKey(sr => sr.AdministratorId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}