namespace Homely.Application.Models.ServiceRequests.Response
{
    public class ServiceRequestResponse
    {
        public int RequestId { get; set; }

        public string Title { get; set; }

        public int CreatorId { get; set; }

        public int? AdministratorId { get; set; }

        public int StatusId { get; set; }

        public string StatusName { get; set; }

        public int UrgencyId { get; set; }

        public string UrgencyName { get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public long CreatedDate { get; set; }

        public string? Description { get; set; }

        public int? PerformerId { get; set; }
    }
}