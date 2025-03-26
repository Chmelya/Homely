using Homely.Infrastructure.Data.Entities;

namespace Homely.Security.Authentication.Services.Interfaces;

public interface IAuthenticationSerivce
{
    string GenerateJwtTokenAsync(User user);
}