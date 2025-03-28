﻿using Homely.Domain.Enums;

namespace Homely.Application.ServiceRequests
{
    public sealed class CreateServiceRequestRequest
    {
        public int UserId { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        public Urgency Urgency { get; set; }

        public Category Category { get; set; }
    }
}