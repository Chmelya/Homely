using Homely.Domain.Entities.Base;
using Homely.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homely.Domain.Entities.Business;

// TODO: Can performe few categories
public class Performer : Entity
{
    public string Name { get; set; }

    public Category Category { get; set; }

    [ForeignKey(nameof(Category))]
    internal EnumEnities.Category CategoryEntity { get; set; }
}