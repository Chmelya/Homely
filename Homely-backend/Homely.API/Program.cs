using Homely.API.OptionsSetup;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Common.Services;
using Homely.Infrastructure.Data;
using Homely.Infrastructure.Data.Repositories;
using Homely.Infrastructure.Identification.Authentication;
using Homely.Infrastructure.Identification.Authentication.Interfaces;
using Homely.Infrastructure.Identification.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

ConfigureServices(builder);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

EnsureDbMigration(app);

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<AuthorizationMiddleware>();

app.MapControllers();

app.Run();

static void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services.AddOpenApi();
    builder.Services.AddControllers();

    ConfigureAuthentification(builder);

    var connection = builder.Configuration.GetConnectionString("DefaultConnection");

    builder.Services.AddDbContext<ApplicationDbContext>(options => options
                    .UseSqlServer(connection));

    //TODO reflection
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();
    builder.Services.AddScoped<IRoleRepository, RoleRepository>();

    builder.Services.AddScoped<IServiceRequestService, ServiceRequestService>();
}

static WebApplication EnsureDbMigration(WebApplication app)
{
    using IServiceScope serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();

    var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
    context?.Database.Migrate();

    return app;
}

static void ConfigureAuthentification(WebApplicationBuilder builder)
{
    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer();

    builder.Services.ConfigureOptions<JwtOptionsSetup>();
    builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();

    builder.Services.AddScoped<IJwtProvider, JwtProvider>();
}