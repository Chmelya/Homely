using Homely.Domain.Entities.Base;

namespace Homely.Domain.Entities.Rbac;

public class Permission : Entity
{
    public string Name { get; set; }

    public List<Role> Roles { get; set; }
}