using Homely.Infrastructure.Identification.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;

namespace Homely.Infrastructure.Identification.Authorization;

public class AuthorizationMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext httpContext)
    {
        var endpoint = httpContext.Features.Get<IEndpointFeature>()?.Endpoint;
        var attribute = endpoint?.Metadata.GetMetadata<AuthorizationAttribute>();

        if (attribute is not null && !attribute.AllowAny)
        {
            var requiredPermissions = attribute.Permissions;

            var userPermissions = httpContext.User.Claims.Where(c => c.Type == CustomClaims.Permissions)
                .Select(c => c.Value)
                .ToList();

            bool hasAccess = userPermissions.Intersect(requiredPermissions).Any();

            if (!hasAccess)
            {
                httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }
        }

        await next(httpContext);
    }
}