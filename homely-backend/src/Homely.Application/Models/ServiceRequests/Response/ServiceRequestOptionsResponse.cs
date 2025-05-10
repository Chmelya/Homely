using Homely.Application.Common.HelperModels;

namespace Homely.Application.Models.ServiceRequests.Response;

public class ServiceRequestOptionsResponse
{
    public List<DropdownValue> Categories { get; set; }

    public List<DropdownValue> Statuses { get; set; }

    public List<DropdownValue> Urgencies { get; set; }
}