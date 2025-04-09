using Homely.Domain.Enums;

namespace Homely.Application.Models.ServiceRequests.Requests
{
    public abstract class BaseServiceRequestRequest
    {
        public int CreatorId { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        public Urgency Urgency { get; set; }

        public Category Category { get; set; }
    }
}