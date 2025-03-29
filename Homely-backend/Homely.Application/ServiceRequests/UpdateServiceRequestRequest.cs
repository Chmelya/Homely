using Homely.Domain.Enums;

namespace Homely.Application.ServiceRequests
{
    public sealed class UpdateServiceRequestRequest : BaseServiceRequestRequest
    {
        public int RequestId { get; set; }

        public int AdministartorId { get; set; }

        public RequestStatus Status { get; set; }
    }
}