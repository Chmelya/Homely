using Homely.Domain.Entities.Common;
using Homely.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homely.Domain.Entities.Business;

public class ServiceRequest : TrackedEntity
{
    public string Title { get; set; }

    public int CreatorId { get; set; }

    public User Creator { get; set; }

    public int? AdministratorId { get; set; }

    public User? Administrator { get; set; }

    public RequestStatus Status { get; set; }

    [ForeignKey(nameof(Status))]
    internal EnumEnities.ServiceRequestStatus StatusEntity { get; set; }

    public Urgency Urgency { get; set; }

    [ForeignKey(nameof(Urgency))]
    internal EnumEnities.Urgency UrgencyEntity { get; set; }

    public Category Category { get; set; }

    [ForeignKey(nameof(Category))]
    internal EnumEnities.Category CategoryEntity { get; set; }

    public ServiceRequestDetails Details { get; set; }
}