using ErrorOr;
using Homely.Application.Common.Filters;
using Homely.Application.Models.ServiceRequests.Requests;
using Homely.Application.Models.ServiceRequests.Response;
using X.PagedList;

namespace Homely.Application.Common.Interfaces.Services;

public interface IServiceRequestService
{
    Task<ErrorOr<Success>> CreateServiceRequestAsync(CreateServiceRequestRequest request);

    ErrorOr<ServiceRequestOptionsResponse> GetOptions();

    Task<ErrorOr<ServiceRequestResponse>> GetRequest(int requestId, CancellationToken cancellationToken = default);

    Task<IPagedList<ServiceRequestResponse>> GetRequests(ServiceRequestFilter filter, CancellationToken cancellationToken = default);

    Task<ErrorOr<Success>> UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request, bool isOwnMode, int? userId = null);
}