﻿using Homely.Application.Authentication.Requests;
using Homely.Application.Common.Interfaces.Services;
using Homely.Infrastructure.Identification.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers;

[Authorization(allowAnonymus: true)]
[Route("api/auth")]
public class AuthenticationController(
    IAuthenticationService authenticationService
    ) : ApiController
{
    [HttpPost("signin", Name = "Sign in")]
    public async Task<IActionResult> SignIn(SignInRequest request)
    {
        var result = await authenticationService.SignIn(request.Email, request.Password);

        return result.Match(Ok, Problem);
    }
}