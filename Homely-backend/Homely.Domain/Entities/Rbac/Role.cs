using Homely.Domain.Entities.Common;

namespace Homely.Domain.Entities.Rbac;

public class Role : Entity
{
    public string Name { get; set; }

    public List<Permission> Permissions { get; set; }
}