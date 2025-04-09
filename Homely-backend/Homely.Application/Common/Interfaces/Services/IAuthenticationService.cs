using ErrorOr;

namespace Homely.Application.Common.Interfaces.Services;

public interface IAuthenticationService
{
    Task<ErrorOr<string>> SignIn(string email, string password, CancellationToken cancellationToken = default);
}