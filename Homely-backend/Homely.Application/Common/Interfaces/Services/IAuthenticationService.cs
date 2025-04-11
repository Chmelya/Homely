using ErrorOr;
using Homely.Application.Models.Authentication.Requests;

namespace Homely.Application.Common.Interfaces.Services;

public interface IAuthenticationService
{
    Task<ErrorOr<string>> SignIn(string email, string password, CancellationToken cancellationToken = default);

    Task<ErrorOr<Success>> SignUp(SignUpRequest request, CancellationToken cancellationToken = default);
}