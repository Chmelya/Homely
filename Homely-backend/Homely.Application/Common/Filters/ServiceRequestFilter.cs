using Homely.Domain.Enums;

namespace Homely.Application.Common.Filters
{
    public sealed class ServiceRequestFilter
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string? SortColumn { get; set; }

        public string? SortOrder { get; set; }

        public List<RequestStatus>? Statuses { get; set; }

        public List<Category>? Categories { get; set; }

        public List<Urgency>? Urgencies { get; set; }
    }
}