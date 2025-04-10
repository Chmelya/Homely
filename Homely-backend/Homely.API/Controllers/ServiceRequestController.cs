using Homely.Application.Common.Filters;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Models.ServiceRequests.Requests;
using Homely.Domain.Constants.Rbac;
using Homely.Infrastructure.Identification.Authorization;
using Homely.Infrastructure.Identification.Common;
using Microsoft.AspNetCore.Mvc;
using Homely.Domain.Enums;

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
            var result = await requestService.UpdateServiceRequestAsync(requestId, request, isOwnMode: false);

            return result.Match(_ => Ok(), Problem);
        }

        [HttpPatch("{requestId:int}/owner", Name = "Edit single service for owner only request")]
        [Authorization(Permissions.RequestEditOnlyOwner)]
        public async Task<IActionResult> EditOwnRequest(
            int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            int.TryParse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == HomelyClaims.UserId)!.Value, out int userId);

            var result = await requestService.UpdateServiceRequestAsync(requestId, request, isOwnMode: true, userId);

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
            [FromQuery] string? sortOrder = null,
            [FromQuery] List<RequestStatus>? statuses = null,
            [FromQuery] List<Category>? categories = null,
            [FromQuery] List<Urgency>? urgencies = null)
        {
            var filter = new ServiceRequestFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                SortColumn = sortColumn,
                SortOrder = sortOrder,
                Statuses = statuses,
                Categories = categories,
                Urgencies = urgencies
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

        [HttpGet("options", Name = "Get service request options")]
        [Authorization(Permissions.RequestRead)]
        public IActionResult GetOptions()
        {
            var result = requestService.GetOptions();

            return result.Match(Ok, Problem);
        }
    }
}