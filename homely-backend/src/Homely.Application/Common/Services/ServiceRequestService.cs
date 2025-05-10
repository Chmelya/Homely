using ErrorOr;
using Homely.Application.Common.Filters;
using Homely.Application.Common.HelperModels;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Extensions;
using Homely.Application.Extensions.PagedList;
using Homely.Application.Models.Common;
using Homely.Application.Models.ServiceRequests.Requests;
using Homely.Application.Models.ServiceRequests.Response;
using Homely.Domain.Entities.Business;
using Homely.Domain.Enums;
using X.PagedList;

namespace Homely.Application.Common.Services
{
    public class ServiceRequestService(
        IServiceRequestRepository requestRepository,
        IPerformerRepository performerRepository
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
                StatusId = (int)request.Status,
                UrgencyId = (int)request.Urgency,
                CategoryId = (int)request.Category,
                StatusName = request.Status.GetDescription(),
                UrgencyName = request.Urgency.GetDescription(),
                CategoryName = request.Category.GetDescription(),
                CreatedDate = ((DateTimeOffset)request.CreatedAt).ToUnixTimeMilliseconds(),

                Description = request.Details.Description,
                PerformerId = request.Details.PerformerId
            };

            return response;
        }

        public async Task<ErrorOr<PagedListResponse<ServiceRequestResponse>>> GetRequests(
            ServiceRequestFilter filter,
            CancellationToken cancellationToken = default)
        {
            try
            {
                var list = (await requestRepository
                    .GetPagedAsync(filter, cancellationToken: cancellationToken))
                    .ToPagedResponse();

                return list;
            }
            catch (Exception)
            {
                throw new InvalidOperationException("Error during fetching service requests");
            }
        }

        public async Task<ErrorOr<Success>> CreateServiceRequestAsync(CreateServiceRequestRequest request)
        {
            try
            {
                var createdRequest = new ServiceRequest()
                {
                    CreatorId = request.CreatorId,
                    Title = request.Title,
                    Urgency = request.UrgencyId,
                    Category = request.CategoryId,
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

        public async Task<ErrorOr<Success>> UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request, bool isAdmin = false, int? userId = null)
        {
            try
            {
                var updatedRequest = await requestRepository.GetWithDetails(r => r.Id == requestId);

                if (updatedRequest is null)
                {
                    return Error.NotFound(description: "Service request is not found");
                }

                if (!isAdmin && updatedRequest.CreatorId != userId)
                {
                    return Error.Forbidden(description: "You can edit only own requests");
                }

                updatedRequest.Title = request.Title;

                updatedRequest.Details.Description = request.Description;

                if (isAdmin)
                {
                    updatedRequest.Urgency = request.UrgencyId;
                    updatedRequest.Category = request.CategoryId;
                    updatedRequest.Status = request.StatusId;

                    updatedRequest.Details.PerformerId = request.PerformerId;
                }

                await requestRepository.UpdateAsync(updatedRequest);

                return await Task.FromResult(Result.Success);
            }
            catch (Exception)
            {
                return Error.Failure(description: "Error during update service request");
            }
        }

        public ErrorOr<ServiceRequestOptionsResponse> GetOptions()
        {
            try
            {
                //TODO: Refactor
                var categoreis = Enum.GetValues(typeof(Category))
                    .Cast<Category>()
                    .Select(category => new DropdownValue { Key = (int)category, Value = category.GetDescription() })
                    .ToList();

                var urgencies = Enum.GetValues(typeof(Urgency))
                   .Cast<Urgency>()
                   .Select(urgency => new DropdownValue { Key = (int)urgency, Value = urgency.GetDescription() })
                   .ToList();

                var statues = Enum.GetValues(typeof(RequestStatus))
                   .Cast<RequestStatus>()
                   .Select(urgency => new DropdownValue { Key = (int)urgency, Value = urgency.GetDescription() })
                   .ToList();

                return new ServiceRequestOptionsResponse
                {
                    Categories = categoreis,
                    Urgencies = urgencies,
                    Statuses = statues
                };
            }
            catch (Exception)
            {
                return Error.Failure(description: "Error during getting service request options");
            }
        }

        public async Task<ErrorOr<List<DropdownValue>>> GetPerformers(Category category)
        {
            try
            {
                return await performerRepository.GetPerformersByCategory(category);
            }
            catch (Exception)
            {
                return Error.Failure(description: "Error during getting performers");
            }
        }
    }
}