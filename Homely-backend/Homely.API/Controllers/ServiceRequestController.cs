using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers
{
    [ApiController]
    public class ServiceRequestController(IServiceRequestService requestService) : ApiController
    {
        [HttpPost(Name = "Create service request")]
        public async Task<IActionResult> CreateRequest(
            [FromBody] CreateServiceRequestRequest request)
        {
            await requestService.CreateServiceRequestAsync(request);

            return Ok();
        }

        [HttpPatch("{requestId:int}", Name = "Edit single service request")]
        public async Task<IActionResult> EditRequest(
            [FromQuery] int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            await requestService.UpdateServiceRequestAsync(requestId, request);

            return Ok();
        }
    }
}