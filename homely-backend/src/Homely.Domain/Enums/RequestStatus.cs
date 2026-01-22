using System.ComponentModel;

namespace Homely.Domain.Enums;

public enum RequestStatus
{
    [Description("Created")]
    Created = 1,

    [Description("In progress")]
    InProgress = 2,

    [Description("Done")]
    Done = 3,

    [Description("Rejected")]
    Rejected = 4,
}