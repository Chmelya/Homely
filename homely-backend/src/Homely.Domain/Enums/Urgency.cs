using System.ComponentModel;

namespace Homely.Domain.Enums;

public enum Urgency
{
    [Description("Critical")]
    Critical = 1,

    [Description("High")]
    High = 2,

    [Description("Medium")]
    Medium = 3,

    [Description("Low")]
    Low = 4,

    [Description("Lowest")]
    Lowest = 5,
}