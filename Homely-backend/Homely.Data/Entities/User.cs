using Homely.Infrastructure.Data.Entities.Common;
using Homely.Infrastructure.Data.Entities.Rbac;

namespace Homely.Infrastructure.Data.Entities;

public class User : Entity
{
    public string Email { get; set; }

    public string Password { get; set; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public Role Role { get; set; }
}