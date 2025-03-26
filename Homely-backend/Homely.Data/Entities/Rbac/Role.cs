using Homely.Infrastructure.Data.Entities.Common;

namespace Homely.Infrastructure.Data.Entities.Rbac;

public class Role : Entity
{
    public string Name { get; set; }

    public List<Permission> Permissions { get; set; }
}