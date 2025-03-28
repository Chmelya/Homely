using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests;
using Homely.Domain.Entities.Business;

namespace Homely.Application.Common.Services
{
    public class ServiceRequestService(
        IServiceRequestRepository requestRepository
        ) : IServiceRequestService
    {
        public async Task CreateServiceRequestAsync(CreateServiceRequestRequest request)
        {
            var createdRequest = new ServiceRequest()
            {
                CreatorId = request.UserId,
                Title = request.Title,
                Urgency = request.Urgency,
                Category = request.Category,
                Status = Domain.Enums.RequestStatus.Created,
                CreatedAt = DateTime.Now,
                Details = new ServiceRequestDetails
                {
                    Description = request.Description,
                }
            };

            await requestRepository.AddAsync(createdRequest);
        }
    }
}