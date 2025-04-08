using Homely.Application.Common.Filters;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.ServiceRequests.Requests;
using Homely.Domain.Constants.Rbac;
using Homely.Infrastructure.Identification.Authorization;
using Microsoft.AspNetCore.Mvc;
using X.PagedList.Extensions;

namespace Homely.API.Controllers
{
    public class ServiceRequestController(IServiceRequestService requestService) : ApiController
    {
        [HttpPost(Name = "Create service request")]
        [Authorization(Permissions.RequestWrite)]
        public async Task<IActionResult> CreateRequest(
            [FromBody] CreateServiceRequestRequest request)
        {
            var result = await requestService.CreateServiceRequestAsync(request);

            return result.Match(_ => Ok(), Problem);
        }

        [HttpPatch("{requestId:int}", Name = "Edit single service request")]
        [Authorization(Permissions.RequestEdit)]
        public async Task<IActionResult> EditRequest(
            int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            var result = await requestService.UpdateServiceRequestAsync(requestId, request);

            return result.Match(_ => Ok(), Problem);
        }

        [HttpGet("{requestId:int}", Name = "Get single service request")]
        [Authorization(Permissions.RequestRead)]
        public async Task<IActionResult> GetRequest(int requestId)
        {
            var result = await requestService.GetRequest(requestId);

            return result.Match(Ok, Problem);
        }

        [HttpGet("sortedList", Name = "Get paged service requests")]
        [Authorization(Permissions.RequestRead)]
        public async Task<IActionResult> GetRequest(
            //TODO: ErrorOr resolve
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sortColumn = null,
            [FromQuery] string? sortOrder = null)
        {
            var filter = new ServiceRequestFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                SortColumn = sortColumn,
                SortOrder = sortOrder
            };

            var result = await requestService.GetRequests(filter);

            var resultWithCount = new
            {
                result.PageCount,
                result.PageNumber,
                TotalCount = result.TotalItemCount,
                Items = result,
            };

            return Ok(resultWithCount);
        }
    }
}