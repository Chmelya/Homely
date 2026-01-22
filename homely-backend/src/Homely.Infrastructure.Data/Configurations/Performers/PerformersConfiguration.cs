using Homely.Domain.Entities.Business;
using Homely.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Homely.Infrastructure.Data.Configurations.Performers;

internal class Performers : IEntityTypeConfiguration<Performer>
{
    public void Configure(EntityTypeBuilder<Performer> builder)
    {
        var performers = new[]
        {
            new Performer { Id = 1, Category = Category.Water, Name = "Water organization 1" },
            new Performer { Id = 2, Category = Category.Sewer, Name = "Sewer organization" },
            new Performer { Id = 3, Category = Category.Electricity, Name = "Electricity organization" },
            new Performer { Id = 4, Category = Category.Garbage, Name = "Garbage organization" },
            new Performer { Id = 5, Category = Category.Garbage, Name = "Barone sanitaion" },
            new Performer { Id = 6, Category = Category.Road, Name = "Road organization" },
            new Performer { Id = 7, Category = Category.Parking, Name = "Parking organization" },
            new Performer { Id = 8, Category = Category.Water, Name = "Water organization 2" },
            new Performer { Id = 9, Category = Category.Water, Name = "Water organization 3" },

            new Performer { Id = 10, Category = Category.Other, Name = "Other organization 1" },
            new Performer { Id = 11, Category = Category.Other, Name = "Other organization 2" },
        };

        builder
            .HasData(performers);

        builder
            .HasIndex(p => p.Name)
            .IsUnique();
    }
}