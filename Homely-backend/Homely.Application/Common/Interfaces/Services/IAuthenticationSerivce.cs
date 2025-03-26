using Homely.Domain.Entities;

namespace Homely.Application.Common.Interfaces.Services;

public interface IAuthenticationSerivce
{
    string GenerateJwtTokenAsync(User user);
}