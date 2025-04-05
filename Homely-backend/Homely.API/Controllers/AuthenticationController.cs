using Homely.Application.Authentication.Requests;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Infrastructure.Identification.Authentication.Interfaces;
using Homely.Infrastructure.Identification.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers;

[Authorization(allowAnonymus: true)]
[Route("api/auth")]
public class AuthenticationController(
    IJwtProvider authenticationService,
    IUserRepository userRepository
    ) : ApiController
{
    [HttpPost("signin", Name = "Sign in")]
    public async Task<IActionResult> SignIn(SignInRequest request)
    {
        var user = await userRepository.GetAsync(u => u.Email == request.Email);

        if (user?.Password != request.Password)
        {
            return NotFound("Login or password is incorrect");
        }

        var token = await authenticationService.GenerateJwtToken(user);

        return Ok(token);
    }
}