using Homely.Domain.Entities.Base;
using Homely.Domain.Enums;

namespace Homely.Domain.Entities.Business;

public class ServiceRequestDetails : Entity
{
    public int ServiceRequestId { get; set; }

    public ServiceRequest ServiceRequest { get; set; }

    public string? Description { get; set; }
}