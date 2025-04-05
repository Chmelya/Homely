﻿using ErrorOr;
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

        public async Task UpdateServiceRequestAsync(int requestId, UpdateServiceRequestRequest request)
        {
            var updatedRequest = await requestRepository.GetAsync(r => r.Id == requestId);

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