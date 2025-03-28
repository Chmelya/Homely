using Homely.Domain.Entities.Common;
using Homely.Domain.Enums;

namespace Homely.Domain.Entities.Business;

public class ServiceRequest : TrackedEntity
{
    public int CreatorId { get; set; }

    public User Creator { get; set; }

    public int HandlerId { get; set; }

    public User Handler { get; set; }

    public int StatusId { get; set; }

    public ServiceRequestStatus Status { get; set; }

    public int UrgencyId { get; set; }

    public Urgency Urgency { get; set; }

    public int CategoryId { get; set; }

    public Category Category { get; set; }

    public ServiceRequestDetails Details { get; set; }
}