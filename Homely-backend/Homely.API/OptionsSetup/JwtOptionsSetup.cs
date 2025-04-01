using Homely.Infrastructure.Identification.Options;
using Microsoft.Extensions.Options;

namespace Homely.API.OptionsSetup;

public class JwtOptionsSetup(IConfiguration configuration) : IConfigureOptions<JwtOptions>
{
    public void Configure(JwtOptions options)
    {
        configuration.GetSection("Jwt").Bind(options);
    }
}