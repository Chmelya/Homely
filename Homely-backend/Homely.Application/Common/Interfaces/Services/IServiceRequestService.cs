using Homely.Application.ServiceRequests;

namespace Homely.Application.Common.Interfaces.Services;

public interface IServiceRequestService
{
    Task CreateServiceRequestAsync(CreateServiceRequestRequest request);

    Task UpdateServiceRequestAsync(UpdateServiceRequestRequest request);
}