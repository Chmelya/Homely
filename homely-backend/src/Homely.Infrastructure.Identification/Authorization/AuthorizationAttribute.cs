namespace Homely.Infrastructure.Identification.Authorization;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
public class AuthorizationAttribute : Attribute
{
    public string[] Permissions { get; private set; }

    public bool AllowAny { get; private set; }

    public AuthorizationAttribute(string[] permissions)
    {
        Permissions = permissions;
    }

    public AuthorizationAttribute(string permission)
    {
        Permissions = [permission];
    }

    public AuthorizationAttribute(bool allowAnonymus)
    {
        AllowAny = true;
    }
}