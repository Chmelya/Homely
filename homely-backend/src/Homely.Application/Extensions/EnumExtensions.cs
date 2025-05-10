﻿using System.ComponentModel;

namespace Homely.Application.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum value)
        {
            var fi = value.GetType()
                .GetField(value.ToString());

            var attributes = fi?.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes is not null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }
    }
}