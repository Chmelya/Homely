using Homely.Application.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Homely.Domain.Entities.EnumEnities;

namespace Homely.Infrastructure.Data.Configurations.EnumEnities;

internal class Categories : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        var data = Enum
            .GetValues(typeof(Domain.Enums.Category))
            .Cast<Domain.Enums.Category>()
            .Select(category => new Category { Id = category, Name = category.GetDescription() });

        builder
            .HasData(data);
    }
}