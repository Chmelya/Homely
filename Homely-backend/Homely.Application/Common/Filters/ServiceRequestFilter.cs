namespace Homely.Application.Common.Filters
{
    public sealed class ServiceRequestFilter
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string? SortColumn { get; set; }

        public string? SortOrder { get; set; }
    }
}