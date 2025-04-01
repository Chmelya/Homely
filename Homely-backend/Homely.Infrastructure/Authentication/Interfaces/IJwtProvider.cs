using Homely.Domain.Entities.Common;

namespace Homely.Infrastructure.Identification.Authentication.Interfaces;

public interface IJwtProvider
{
    Task<string> GenerateJwtToken(User user);
}