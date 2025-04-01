using Homely.Domain.Entities.Base;
using Homely.Domain.Entities.Business;
using Homely.Domain.Entities.Rbac;

namespace Homely.Domain.Entities.Common;

public class User : Entity
{
    public string Email { get; set; }

    public string Password { get; set; }

    public string FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string LastName { get; set; }

    public int RoleId { get; set; }

    public Role Role { get; set; }
}