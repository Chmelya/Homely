using System.Security.Cryptography;
using Homely.Application.Common.Interfaces.Services;

namespace Homely.Application.Common.Services;

public class HashierService : IHashierService
{
    const int SaltSize = 16;
    const int HashSize = 32;
    const int Iterarions = 100000;

    private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

    public string Hash(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var passwordHash = Rfc2898DeriveBytes.Pbkdf2(password, salt,  Iterarions, Algorithm, HashSize);

        return $"{Convert.ToHexString(passwordHash)}-{Convert.ToHexString(salt)}";
    }

    public bool Verify(string password, string passwordHash)
    {
        var parts = passwordHash.Split('-');
        var hash = Convert.FromHexString(parts[0]); 
        var salt = Convert.FromHexString(parts[1]);

        var inputHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterarions, Algorithm, HashSize);

        var isSame = hash.SequenceEqual(inputHash);

        return isSame;
    }
}
