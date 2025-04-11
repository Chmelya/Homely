using Homely.Application.Common.Interfaces.Services;
using Homely.Infrastructure.Identification.Authentication;
using Homely.Infrastructure.Identification.Authorization;
using Homely.Infrastructure.Identification.OptionsSetup;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Homely.Infrastructure.Identification
{
    public static class DependencyInjection
    {
        public static void AddJwt(this IServiceCollection services)
        {
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer();

            services.ConfigureOptions<JwtOptionsSetup>();
            services.ConfigureOptions<JwtBearerOptionsSetup>();

            services.AddScoped<IJwtProvider, JwtProvider>();
        }

        public static void UseJwt(this WebApplication app)
        {
            app.UseMiddleware<AuthorizationMiddleware>();
        }
    }
}