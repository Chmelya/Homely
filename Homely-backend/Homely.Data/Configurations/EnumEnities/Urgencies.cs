using Homely.Application.Extensions;
using Homely.Domain.Entities.EnumEnities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homely.Infrastructure.Data.Configurations.EnumEnities;

internal class Urgencies : IEntityTypeConfiguration<Urgency>
{
    public void Configure(EntityTypeBuilder<Urgency> builder)
    {
        var data = Enum
            .GetValues(typeof(Domain.Enums.Urgency))
            .Cast<Domain.Enums.Urgency>()
            .Select(category => new Urgency { Id = category, Name = category.GetDescription() });

        builder
            .HasData(data);
    }
}