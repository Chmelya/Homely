using Homely.Domain.Entities.Common;
using Homely.Domain.Enums;

namespace Homely.Domain.Entities.Business;

public class ServiceRequestDetails : Entity
{
    public int ServiceRequestId { get; set; }

    public ServiceRequest ServiceRequest { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }
}