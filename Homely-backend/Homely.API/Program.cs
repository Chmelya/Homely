using Homely.Authentication.Services;
using Homely.Infrastructure.Data;
using Homely.Security.Authentication.Services.Interfaces;
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

app.Run();

static void ConfigureServices(WebApplicationBuilder builder)
{
    var connection = builder.Configuration.GetConnectionString("DefaultConnection");

    builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

    builder.Services.AddOpenApi();
    builder.Services.AddControllers();

    builder.Services.AddScoped<IAuthenticationSerivce, AuthenticationSerivce>();
}