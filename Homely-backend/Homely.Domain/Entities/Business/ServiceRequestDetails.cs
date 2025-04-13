using Homely.Domain.Entities.Base;

namespace Homely.Domain.Entities.Business;

public class ServiceRequestDetails : Entity
{
    public int ServiceRequestId { get; set; }

    public ServiceRequest ServiceRequest { get; set; }

    public string? Description { get; set; }

    public int? PerformerId { get; set; }

    public Performer? Performer { get; set; }
}