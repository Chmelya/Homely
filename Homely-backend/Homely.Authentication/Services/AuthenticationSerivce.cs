using Homely.Infrastructure.Data.Entities;
using Homely.Security.Authentication.Services.Interfaces;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Homely.Authentication.Services;

public sealed class AuthenticationSerivce : IAuthenticationSerivce
{
    //TODO: move to config
    private int lifetimeMinutes = 30;

    private string secret = "secretsecretsecretsecretsecretsecretsecret";

    private string issuer = "Homely";

    public string GenerateJwtTokenAsync(User user)
    {
        var data = Encoding.UTF8.GetBytes(secret);
        var securityKey = new SymmetricSecurityKey(data);

        var claims = new Dictionary<string, object>
        {
            [ClaimTypes.Email] = user.Email,
            [ClaimTypes.Role] = user.Role,
        };

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = issuer,
            Claims = claims,
            IssuedAt = DateTime.UtcNow,
            NotBefore = DateTime.UtcNow,
            Expires = DateTime.UtcNow.AddMinutes(lifetimeMinutes),
            SigningCredentials = credentials
        };

        var handler = new JsonWebTokenHandler();
        handler.SetDefaultTimesOnTokenCreation = false;

        var tokenString = handler.CreateToken(descriptor);

        return tokenString;
    }
}