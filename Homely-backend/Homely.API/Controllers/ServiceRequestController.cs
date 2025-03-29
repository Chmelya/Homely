using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers
{
    [ApiController]
    [Route("/api/serviceRequest")]
    public class ServiceRequestController(IServiceRequestService requestService) : ApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateRequest(
            [FromBody] CreateServiceRequestRequest request)
        {
            await requestService.CreateServiceRequestAsync(request);

            return Ok();
        }

        [HttpPatch("/{requestId:int}")]
        public async Task<IActionResult> EditRequest(
            [FromQuery] int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            await requestService.UpdateServiceRequestAsync(request);

            return Ok();
        }
    }
}