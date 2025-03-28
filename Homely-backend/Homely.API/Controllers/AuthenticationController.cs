using Homely.Application.Authentication.Requests;
using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Application.Common.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers;

[AllowAnonymous]
[Route("api/auth")]
public class AuthenticationController(
    IAuthenticationSerivce authenticationService,
    IUserRepository userRepository
    ) : ApiController
{
    [HttpPost("/signin", Name = "Sign in")]
    public async Task<IActionResult> SignIn(SignInRequest request)
    {
        var user = await userRepository.FindAsync(u => u.Email == request.Email);

        if (user?.Password != request.Password)
        {
            return NotFound("Login or password is incorrect");
        }

        var token = authenticationService.GenerateJwtTokenAsync(user);

        return Ok(token);
    }

    //[HttpPost("/signout", Name = "Sign out")]
    //public async Task<IActionResult> SignOut()
    //{
    //    return Ok();
    //}
}