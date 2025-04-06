using ErrorOr;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests.Requests;
using Homely.Application.ServiceRequests.Response;
using Homely.Domain.Entities.Business;
using Homely.Domain.Enums;

namespace Homely.Application.Common.Services
{
    public class ServiceRequestService(
        IServiceRequestRepository requestRepository
        ) : IServiceRequestService
    {
        public async Task<ErrorOr<ServiceRequestResponse>> GetRequest(
            int requestId,
            CancellationToken cancellationToken = default)
        {
            var request = await requestRepository.GetWithDetails
                (r => r.Id == requestId,
                isAsNoTracking: true,
                cancellationToken: cancellationToken);

            if (request is null)
            {
                return Error.NotFound(description: "Service request is not found");
            }

            var response = new ServiceRequestResponse()
            {
                RequestId = request.Id,
                Title = request.Title,
                CreatorId = request.CreatorId,
                AdministratorId = request.AdministratorId,
                Status = (int)request.Status,
                Urgency = (int)request.Urgency,
                Category = (int)request.Category,
                Description = request.Details.Description,
            };

            return response;
        }

        public async Task<ErrorOr<Success>> CreateServiceRequestAsync(CreateServiceRequestRequest request)
        {
            try
            {
                var createdRequest = new ServiceRequest()
                {
                    CreatorId = request.CreatorId,
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

                return await Task.FromResult(Result.Success);
            }
            catch (Exception)
            {
                return Error.Failure(description: "Error during create service request");
            }
        }

        public async Task<ErrorOr<Success>> UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request)
        {
            try
            {
                var updatedRequest = await requestRepository.GetWithDetails(r => r.Id == requestId);

                if (updatedRequest is null)
                {
                    return Error.NotFound(description: "Service request is not found");
                }

                updatedRequest.Title = request.Title;
                updatedRequest.Urgency = request.Urgency;
                updatedRequest.Category = request.Category;
                updatedRequest.Status = request.Status;

                updatedRequest.Details.Description = request.Description;

                await requestRepository.UpdateAsync(updatedRequest);

                return await Task.FromResult(Result.Success);
            }
            catch (Exception)
            {
                return Error.Failure(description: "Error during update service request");
            }
        }
    }
}