using Homely.API.Extensions.Middleware;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Common.Services;
using Homely.Infrastructure.Data;
using Homely.Infrastructure.Identification;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Homely.API.Setup;

internal static class ApiConfigurator
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddOpenApi();
        builder.Services.AddControllers();

        builder.Services.AddJwt();

        var connection = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddRepositories(connection);

        builder.Services.AddScoped<IServiceRequestService, ServiceRequestService>();
        builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = @"JWT Authorization header using the Bearer scheme.
Enter 'Bearer ' (with space) and then your token in the text input below.
Example: 'Bearer 1234ABCD'.",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
            });

            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference {Type = ReferenceType.SecurityScheme, Id = "Bearer"},
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },
                    new List<string>()
                },
            });
        });

        return builder;
    }

    public static WebApplication PiplineSetup(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.EnsureDbMigration();

        app.AddExceptionHandler();

        app.UseHttpsRedirection();
        app.UseCors();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseJwt();

        app.MapControllers();

        return app;
    }

    private static void EnsureDbMigration(this WebApplication app)
    {
        using IServiceScope serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();

        var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
        context?.Database.Migrate();
    }
}