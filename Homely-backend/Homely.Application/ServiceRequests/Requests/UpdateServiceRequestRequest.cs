using Homely.Domain.Enums;

namespace Homely.Application.ServiceRequests.Requests
{
    public sealed class UpdateServiceRequestRequest : BaseServiceRequestRequest
    {
        public int AdministartorId { get; set; }

        public RequestStatus Status { get; set; }
    }
}