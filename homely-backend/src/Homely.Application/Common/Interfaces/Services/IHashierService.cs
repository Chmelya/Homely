namespace Homely.Application.Common.Interfaces.Services;

public interface IHashierService
{
    public string Hash(string password);

    public bool Verify(
        string password,
        string passwordHash);
}
