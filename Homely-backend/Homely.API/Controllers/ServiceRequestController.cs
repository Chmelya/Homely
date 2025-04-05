using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests.Requests;
using Homely.Domain.Constants.Rbac;
using Homely.Infrastructure.Identification.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers
{
    public class ServiceRequestController(IServiceRequestService requestService) : ApiController
    {
        [HttpPost(Name = "Create service request")]
        [Authorization(Permissions.RequestWrite)]
        public async Task<IActionResult> CreateRequest(
            [FromBody] CreateServiceRequestRequest request)
        {
            await requestService.CreateServiceRequestAsync(request);

            return Ok();
        }

        [HttpPatch("{requestId:int}", Name = "Edit single service request")]
        [Authorization(Permissions.RequestEdit)]
        public async Task<IActionResult> EditRequest(
            [FromQuery] int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            await requestService.UpdateServiceRequestAsync(requestId, request);

            return Ok();
        }

        [HttpGet("{requestId:int}", Name = "Edit single service request")]
        [Authorization(Permissions.RequestEdit)]
        public async Task<IActionResult> GetRequest(
            [FromQuery] int requestId)
        {
            var result = await requestService.GetRequest(requestId);

            return result.Match(Ok, Problem);
        }
    }
}