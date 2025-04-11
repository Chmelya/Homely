using Homely.Application.Common.Interfaces.Services;
using Homely.Application.Models.Authentication.Requests;
using Homely.Infrastructure.Identification.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers;

[Authorization(allowAnonymus: true)]
[Route("api/auth")]
public class AuthenticationController(
    IAuthenticationService authenticationService
    ) : ApiController
{
    [HttpPost("signIn", Name = "Sign in")]
    public async Task<IActionResult> SignIn(SignInRequest request)
    {
        var result = await authenticationService.SignIn(request.Email, request.Password);

        return result.Match(Ok, Problem);
    }

    [HttpPost("signUp", Name = "Sign up")]
    public async Task<IActionResult> SignUp(SignUpRequest request)
    {
        var result = await authenticationService.SignUp(request);

        return result.Match(_ => Ok(), Problem);
    }
}