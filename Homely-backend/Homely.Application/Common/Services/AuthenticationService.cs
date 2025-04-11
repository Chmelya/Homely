using ErrorOr;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Models.Authentication.Requests;
using System.Text.RegularExpressions;

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
            return Error.NotFound(description: "Login or password is incorrect.");
        }

        var token = await tokenProvider.GenerateJwtToken(user);

        return token;
    }

    public async Task<ErrorOr<Success>> SignUp(SignUpRequest request, CancellationToken cancellationToken = default)
    {
        //TODO to array of errors
        var emailRegex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
        if (!emailRegex.IsMatch(request.Email))
        {
            return Error.Validation(description: "Login must be an email.");
        }

        var hasNumber = new Regex(@"[0-9]+");
        var hasUpperChar = new Regex(@"[A-Z]+");
        var hasMinimum8Chars = new Regex(@".{8,}");
        var isPasswordValidated = hasNumber.IsMatch(request.Password)
            && hasUpperChar.IsMatch(request.Password)
            && hasMinimum8Chars.IsMatch(request.Password);
        if (!isPasswordValidated)
        {
            return Error.Validation(description: "Password should be at least 8 characters contains one upper letter and one number.");
        }

        var hasNameChars = new Regex(@"^[a-zA-Z]+[-'s]?[a-zA-Z ]+$");

        if (!hasNameChars.IsMatch(request.FirstName))
        {
            return Error.Validation(description: "First name contains invaild charcters.");
        }

        if (request.MiddleName is not null && !hasNameChars.IsMatch(request.MiddleName))
        {
            return Error.Validation(description: "Middle name contains invaild charcters.");
        }

        if (!hasNameChars.IsMatch(request.LastName))
        {
            return Error.Validation(description: "Last name contains invaild charcters.");
        }

        var user = await userRepository.GetWithRole(u => u.Email == request.Email, cancellationToken);

        if (user is not null)
        {
            return Error.Conflict(description: "Login alredy in use.");
        }

        await userRepository.AddResident(request);

        return Result.Success;
    }
}