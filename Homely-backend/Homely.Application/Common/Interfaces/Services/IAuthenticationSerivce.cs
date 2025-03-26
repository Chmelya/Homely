using Homely.Domain.Entities.Common;

namespace Homely.Application.Common.Interfaces.Services;

public interface IAuthenticationSerivce
{
    string GenerateJwtTokenAsync(User user);
}