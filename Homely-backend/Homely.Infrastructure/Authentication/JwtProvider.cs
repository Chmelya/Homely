using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Common;
using Homely.Infrastructure.Identification.Authentication.Interfaces;
using Homely.Infrastructure.Identification.Common;
using Homely.Infrastructure.Identification.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Homely.Infrastructure.Identification.Authentication;

public sealed class JwtProvider(
    IOptions<JwtOptions> options,
    IRoleRepository roleRepository) : IJwtProvider
{
    private JwtOptions _options = options.Value;

    public async Task<string> GenerateJwtToken(User user)
    {
        var secretBytes = Encoding.UTF8.GetBytes(_options.Secret);
        var securityKey = new SymmetricSecurityKey(secretBytes);

        var claims = new List<Claim>()
        {
            new (HomelyClaims.UserId, user.Id.ToString()),
            new (HomelyClaims.FullName, GetName(user)),
            new (HomelyClaims.Email, user.Email),
        };

        var userPermissions = (await roleRepository.GetWithPermissionsAsync(r => r.Id == user.RoleId))
            ?.Permissions;
        userPermissions?.ForEach(p => claims.Add(new(HomelyClaims.Permissions, p.Name)));

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256Signature);

        var token = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claims,
            null,
            DateTime.UtcNow.AddMinutes(_options.LifetimeInMinutes),
            credentials);

        var tokenValue = new JwtSecurityTokenHandler()
            .WriteToken(token);

        return tokenValue;
    }

    private static string GetName(User user)
    {
        return user.FirstName
            +
            (user.MiddleName is not null ? " " + user.MiddleName : string.Empty)
            + " " + user.LastName;
    }
}