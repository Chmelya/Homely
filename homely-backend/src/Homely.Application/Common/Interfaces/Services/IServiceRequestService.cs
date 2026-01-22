using ErrorOr;
using Homely.Application.Common.Filters;
using Homely.Application.Common.HelperModels;
using Homely.Application.Models.Common;
using Homely.Application.Models.ServiceRequests.Requests;
using Homely.Application.Models.ServiceRequests.Response;
using Homely.Domain.Enums;
using X.PagedList;

namespace Homely.Application.Common.Interfaces.Services;

public interface IServiceRequestService
{
    Task<ErrorOr<Success>> CreateServiceRequestAsync(CreateServiceRequestRequest request);

    ErrorOr<ServiceRequestOptionsResponse> GetOptions();

    Task<ErrorOr<List<DropdownValue>>> GetPerformers(Category category);

    Task<ErrorOr<ServiceRequestResponse>> GetRequest(int requestId, CancellationToken cancellationToken = default);

    Task<ErrorOr<PagedListResponse<ServiceRequestResponse>>> GetRequests(ServiceRequestFilter filter, CancellationToken cancellationToken = default);

    Task<ErrorOr<Success>> UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request, bool isAdmin = false, int? userId = null);
}