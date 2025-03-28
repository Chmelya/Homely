using Homely.Domain.Entities.Common;
using Homely.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homely.Domain.Entities.Business;

public class ServiceRequest : TrackedEntity
{
    public int CreatorId { get; set; }

    public User Creator { get; set; }

    public int HandlerId { get; set; }

    public User Handler { get; set; }

    public ServiceRequestStatus Status { get; set; }

    [ForeignKey(nameof(Status))]
    public EnumEnities.ServiceRequestStatus StatusEntity { get; set; }

    public Urgency Urgency { get; set; }

    [ForeignKey(nameof(Urgency))]
    public EnumEnities.Urgency UrgencyEntity { get; set; }

    public Category Category { get; set; }

    [ForeignKey(nameof(Category))]
    public EnumEnities.Category CategoryEntity { get; set; }

    public ServiceRequestDetails Details { get; set; }
}