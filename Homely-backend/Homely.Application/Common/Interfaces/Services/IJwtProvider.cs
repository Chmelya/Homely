using Homely.Domain.Entities.Common;

namespace Homely.Application.Common.Interfaces.Services;

public interface IJwtProvider
{
    Task<string> GenerateJwtToken(User user);
}