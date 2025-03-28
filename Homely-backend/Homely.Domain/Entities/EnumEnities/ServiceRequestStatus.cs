using Homely.Domain.Entities.Common;
using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.EnumEnities
{
    public class ServiceRequestStatus : Entity
    {
        [Key]
        public new Enums.ServiceRequestStatus Id { get; set; }

        public string Name { get; set; }
    }
}