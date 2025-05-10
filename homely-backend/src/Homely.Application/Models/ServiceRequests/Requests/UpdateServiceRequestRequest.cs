using Homely.Domain.Enums;

namespace Homely.Application.Models.ServiceRequests.Requests
{
    public sealed class UpdateServiceRequestRequest : BaseServiceRequestRequest
    {
        public int AdministartorId { get; set; }

        public RequestStatus StatusId { get; set; }

        public int? PerformerId { get; set; }
    }
}