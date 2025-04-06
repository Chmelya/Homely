using ErrorOr;
using Homely.Application.ServiceRequests.Requests;
using Homely.Application.ServiceRequests.Response;

namespace Homely.Application.Common.Interfaces.Services;

public interface IServiceRequestService
{
    Task<ErrorOr<Success>> CreateServiceRequestAsync(CreateServiceRequestRequest request);

    Task<ErrorOr<ServiceRequestResponse>> GetRequest(int requestId, CancellationToken cancellationToken = default);

    Task<ErrorOr<Success>> UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request);
}