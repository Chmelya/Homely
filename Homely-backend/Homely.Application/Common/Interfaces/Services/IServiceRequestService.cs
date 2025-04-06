using ErrorOr;
using Homely.Application.ServiceRequests.Requests;
using Homely.Application.ServiceRequests.Response;
using X.PagedList;

namespace Homely.Application.Common.Interfaces.Services;

public interface IServiceRequestService
{
    Task<ErrorOr<Success>> CreateServiceRequestAsync(CreateServiceRequestRequest request);

    Task<ErrorOr<ServiceRequestResponse>> GetRequest(int requestId, CancellationToken cancellationToken = default);

    Task<IPagedList<ServiceRequestResponse>> GetRequests(int pageNumber, int pageSize, CancellationToken cancellationToken = default);

    Task<ErrorOr<Success>> UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request);
}