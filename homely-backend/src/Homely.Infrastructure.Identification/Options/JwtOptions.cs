namespace Homely.Infrastructure.Identification.Options;

public class JwtOptions
{
    public int LifetimeInMinutes { get; set; }

    public string Secret { get; set; }

    public string Issuer { get; set; }

    public string Audience { get; set; }
}