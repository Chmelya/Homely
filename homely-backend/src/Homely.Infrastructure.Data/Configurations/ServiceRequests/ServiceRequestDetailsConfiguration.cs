using Homely.Domain.Entities.Business;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homely.Infrastructure.Data.Configurations.ServiceRequests;

internal class ServiceRequestDetailsConfiguration : IEntityTypeConfiguration<ServiceRequestDetails>
{
    public void Configure(EntityTypeBuilder<ServiceRequestDetails> builder)
    {
        builder
            .HasOne(srd => srd.Performer)
            .WithMany()
            .HasForeignKey(srd => srd.PerformerId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}