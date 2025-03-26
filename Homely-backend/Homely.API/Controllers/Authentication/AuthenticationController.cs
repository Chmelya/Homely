using Homely.API.Controllers.Common;
using Homely.Application.Authentication.Requests;
using Homely.Application.Common.Interfaces.Services;
using Homely.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers.Authentication;

[AllowAnonymous]
public class AuthenticationController(IAuthenticationSerivce authenticationService) : ApiController
{
    [HttpPost("/signin", Name = "Sign in")]
    public IActionResult SignIn(SignInRequest request)
    {
        var user = new User() { Email = "admin@mail.com" };

        authenticationService.GenerateJwtTokenAsync(user);

        return Ok();
    }

    [HttpPost("/signout", Name = "Sign out")]
    public async Task<IActionResult> SignOut()
    {
        return Ok();
    }
}