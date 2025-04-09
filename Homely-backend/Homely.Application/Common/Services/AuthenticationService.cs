using ErrorOr;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Common.Interfaces.Services;
using Homely.Infrastructure.Identification.Authentication.Interfaces;

namespace Homely.Application.Common.Services;

public class AuthenticationService(
    IJwtProvider tokenProvider,
    IUserRepository userRepository) : IAuthenticationService
{
    public async Task<ErrorOr<string>> SignIn(string email, string password, CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetWithRole(u => u.Email == email, cancellationToken);

        if (user?.Password != password)
        {
            return Error.NotFound(description: "Login or password is incorrect");
        }

        var token = await tokenProvider.GenerateJwtToken(user);

        return token;
    }
}