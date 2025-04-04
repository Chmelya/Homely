﻿using Homely.Domain.Enums;

namespace Homely.Application.ServiceRequests
{
    public abstract class BaseServiceRequestRequest
    {
        public int UserId { get; set; }

        public string Title { get; set; }

        public string? Description { get; set; }

        public Urgency Urgency { get; set; }

        public Category Category { get; set; }
    }
}