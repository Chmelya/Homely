using Homely.Domain.Entities.Common;

namespace Homely.Domain.Entities.Business;

public class ServiceRequest : TrackedEntity
{
    public User Creator { get; set; }

    public User Handler { get; set; }

    //public ServiceRequestStatus Status { get; set; }

    //public ServiceRequestDetails Details { get; set; }
}