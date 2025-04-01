using Homely.Infrastructure.Identification.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Homely.Infrastructure.Identification.OptionsSetup;

public class JwtOptionsSetup(IConfiguration configuration) : IConfigureOptions<JwtOptions>
{
    public void Configure(JwtOptions options)
    {
        configuration.GetSection("Jwt").Bind(options);
    }
}