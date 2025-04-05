namespace Homely.Application.ServiceRequests.Response
{
    public class ServiceRequestResponse
    {
        public string Title { get; set; }

        public int CreatorId { get; set; }

        public int? AdministratorId { get; set; }

        public int Status { get; set; }

        public int Urgency { get; set; }

        public int Category { get; set; }

        public string? Description { get; set; }
    }
}