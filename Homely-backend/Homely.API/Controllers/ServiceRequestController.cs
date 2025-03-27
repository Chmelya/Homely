using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers
{
    [ApiController]
    [Route("/api/serviceRequest")]
    public class ServiceRequestController : ApiController
    {
        [HttpPost]
        public IActionResult CreateRequest()
        {
            return Ok();
        }

        [HttpPatch("/{requestId:int}")]
        public IActionResult EditRequest(int requestId)
        {
            return Ok();
        }
    }
}