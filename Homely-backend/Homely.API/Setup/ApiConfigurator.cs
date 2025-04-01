using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Common.Services;
using Homely.Infrastructure.Data;
using Homely.Infrastructure.Identification;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

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

        return builder;
    }

    public static WebApplication PiplineSetup(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.EnsureDbMigration();

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