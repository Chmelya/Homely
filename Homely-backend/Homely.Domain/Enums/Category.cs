using System.ComponentModel;

namespace Homely.Domain.Enums;

public enum Category
{
    [Description("Other")]
    Other = 1,

    [Description("Water")]
    Water = 2,

    [Description("Sewer")]
    Sewer = 3,

    [Description("Electricity")]
    Electricity = 4,

    [Description("Garbage")]
    Garbage = 5,

    [Description("Road")]
    Road = 6,

    [Description("Parking")]
    Parking = 7,
}