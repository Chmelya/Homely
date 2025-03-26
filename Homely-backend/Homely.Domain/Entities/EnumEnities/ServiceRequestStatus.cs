using Homely.Domain.Entities.Base;
using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.EnumEnities
{
    public class ServiceRequestStatus : Entity
    {
        [Key]
        public new Enums.RequestStatus Id { get; set; }

        public string Name { get; set; }
    }
}