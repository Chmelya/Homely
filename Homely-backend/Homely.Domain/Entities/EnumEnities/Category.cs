using Homely.Domain.Entities.Common;
using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.EnumEnities
{
    public class Category : Entity
    {
        [Key]
        public new Enums.Category Id { get; set; }

        public string Name { get; set; }
    }
}