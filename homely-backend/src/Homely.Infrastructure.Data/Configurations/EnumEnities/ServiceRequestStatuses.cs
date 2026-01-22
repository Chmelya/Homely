using Homely.Application.Extensions;
using Homely.Domain.Entities.EnumEnities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homely.Infrastructure.Data.Configurations.EnumEnities;

internal class ServiceRequestStatuses : IEntityTypeConfiguration<ServiceRequestStatus>
{
    public void Configure(EntityTypeBuilder<ServiceRequestStatus> builder)
    {
        var data = Enum
            .GetValues(typeof(Domain.Enums.RequestStatus))
            .Cast<Domain.Enums.RequestStatus>()
            .Select(category => new ServiceRequestStatus { Id = category, Name = category.GetDescription() });

        builder
            .HasData(data);
    }
}