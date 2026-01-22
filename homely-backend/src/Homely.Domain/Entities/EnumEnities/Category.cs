using Homely.Domain.Entities.Base;
using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.EnumEnities
{
    // TODO: To internal
    public class Category : Entity
    {
        [Key]
        public new Enums.Category Id { get; set; }

        public string Name { get; set; }
    }
}