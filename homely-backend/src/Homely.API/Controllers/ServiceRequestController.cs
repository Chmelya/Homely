using Homely.Application.Common.Filters;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Models.ServiceRequests.Requests;
using Homely.Domain.Constants.Rbac;
using Homely.Domain.Enums;
using Homely.Infrastructure.Identification.Authorization;
using Homely.Infrastructure.Identification.Common;
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
            var result = await requestService.CreateServiceRequestAsync(request);

            return result.Match(_ => Ok(), Problem);
        }

        [HttpPatch("{requestId:int}", Name = "Edit single service request")]
        [Authorization(Permissions.RequestEdit)]
        public async Task<IActionResult> EditRequest(
            int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            var result = await requestService.UpdateServiceRequestAsync(requestId, request, isAdmin: true);

            return result.Match(_ => Ok(), Problem);
        }

        [HttpPatch("{requestId:int}/owner", Name = "Edit single service for owner only request")]
        [Authorization(Permissions.RequestEditSelfOnly)]
        public async Task<IActionResult> EditOwnRequest(
            int requestId,
            [FromBody] UpdateServiceRequestRequest request)
        {
            int.TryParse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == HomelyClaims.UserId)!.Value, out int userId);

            var result = await requestService.UpdateServiceRequestAsync(requestId, request, isAdmin: false, userId);

            return result.Match(_ => Ok(), Problem);
        }

        [HttpGet("{requestId:int}", Name = "Get single service request")]
        [Authorization(Permissions.RequestRead)]
        public async Task<IActionResult> GetRequest(int requestId)
        {
            var result = await requestService.GetRequest(requestId);

            return result.Match(Ok, Problem);
        }

        [HttpGet("sortedList", Name = "Get sorted and paged service requests")]
        [Authorization([
            Permissions.RequestRead,
            Permissions.RequestReadSelfOnly
        ])]
        public async Task<IActionResult> GetRequest(
            //TODO: ErrorOr resolve
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sortColumn = null,
            [FromQuery] string? sortOrder = null,
            [FromQuery(Name = "statuses[]")] List<RequestStatus>? statuses = null,
            [FromQuery(Name = "categories[]")] List<Category>? categories = null,
            [FromQuery(Name = "urgencies[]")] List<Urgency>? urgencies = null)
        {
            // TODO: Refactor?
            int? userId = null;
            if (HttpContext.User.Claims.FirstOrDefault(c => c.Type == HomelyClaims.Role)!.Value != Roles.Admin)
            {
                userId = int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == HomelyClaims.UserId)!.Value);
            }

            var filter = new ServiceRequestFilter
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                SortColumn = sortColumn,
                SortOrder = sortOrder,
                UserId = userId,
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
        [Authorization(allowAnonymus: true)]
        public IActionResult GetOptions()
        {
            var result = requestService.GetOptions();

            return result.Match(Ok, Problem);
        }

        [HttpGet("{category:int}/performers", Name = "Get service request performers for category")]
        [Authorization(allowAnonymus: true)]
        public async Task<IActionResult> GetPerformers(Category category)
        {
            var result = await requestService.GetPerformers(category);

            return result.Match(Ok, Problem);
        }
    }
}