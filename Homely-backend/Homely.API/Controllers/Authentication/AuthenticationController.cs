using Homely.API.Controllers.Common;
using Homely.Application.Authentication.Requests;
using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Application.Common.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers.Authentication;

[AllowAnonymous]
public class AuthenticationController(
    IAuthenticationSerivce authenticationService,
    IUserRepository userRepository
    ) : ApiController
{
    [HttpPost("/signin", Name = "Sign in")]
    public async Task<IActionResult> SignIn(SignInRequest request)
    {
        var user = await userRepository.FindAsync(u => u.Email == request.Email)
            ?? throw new Exception("UserNotFound");

        authenticationService.GenerateJwtTokenAsync(user);

        return Ok();
    }

    //[HttpPost("/signout", Name = "Sign out")]
    //public async Task<IActionResult> SignOut()
    //{
    //    return Ok();
    //}
}