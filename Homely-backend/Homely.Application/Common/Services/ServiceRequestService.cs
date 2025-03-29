using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests;
using Homely.Domain.Entities.Business;
using Homely.Domain.Enums;

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
                Status = RequestStatus.Created,
                CreatedAt = DateTime.Now,
                Details = new ServiceRequestDetails
                {
                    Description = request.Description,
                }
            };

            await requestRepository.AddAsync(createdRequest);
        }

        public async Task UpdateServiceRequestAsync(UpdateServiceRequestRequest request)
        {
            var updatedRequest = await requestRepository.FindAsync(r => r.Id == request.RequestId);

            if (updatedRequest is null)
            {
                throw new Exception("NotFound");
            }

            updatedRequest.CreatorId = request.UserId;
            updatedRequest.Title = request.Title;
            updatedRequest.Urgency = request.Urgency;
            updatedRequest.Category = request.Category;
            updatedRequest.Status = RequestStatus.Created;

            updatedRequest.Details.Description = request.Description;

            await requestRepository.UpdateAsync(updatedRequest);
        }
    }
}