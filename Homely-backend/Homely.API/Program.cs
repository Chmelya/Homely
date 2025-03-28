using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Common.Services;
using Homely.Infrastructure.Data;
using Homely.Infrastructure.Data.Repositories;
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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors();

EnsureDbMigration(app);

app.Run();

static void ConfigureServices(WebApplicationBuilder builder)
{
    var connection = builder.Configuration.GetConnectionString("DefaultConnection");

    builder.Services.AddDbContext<ApplicationDbContext>(options => options
                    .UseSqlServer(connection));

    builder.Services.AddOpenApi();
    builder.Services.AddControllers();

    //TODO reflection
    builder.Services.AddScoped<IUserRepository, UserRepository>();
    builder.Services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();

    builder.Services.AddScoped<IAuthenticationSerivce, AuthenticationSerivce>();
    builder.Services.AddScoped<IServiceRequestService, ServiceRequestService>();
}

static WebApplication EnsureDbMigration(WebApplication app)
{
    using IServiceScope serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();

    var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

    //context?.Database.EnsureDeleted();
    //context?.Database.EnsureCreated();

    context?.Database.Migrate();

    return app;
}