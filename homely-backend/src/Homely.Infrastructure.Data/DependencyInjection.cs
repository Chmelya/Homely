using Homely.Application.Common.Interfaces.Repositories;
using Homely.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Homely.Infrastructure.Data;

public static class DependencyInjection
{
    public static void AddRepositories(
        this IServiceCollection services,
        string? connection)
    {
        services.AddDbContext<ApplicationDbContext>(options => options
                        .UseSqlServer(connection));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IServiceRequestRepository, ServiceRequestRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IPerformerRepository, PerformerRepository>();
    }
}