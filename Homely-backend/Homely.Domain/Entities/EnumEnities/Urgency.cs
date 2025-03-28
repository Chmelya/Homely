using Homely.Domain.Entities.Common;
using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.EnumEnities
{
    public class Urgency : Entity
    {
        [Key]
        public new Enums.Urgency Id { get; set; }

        public string Name { get; set; }
    }
}