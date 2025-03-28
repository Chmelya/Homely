using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.Common;

public abstract class Entity
{
    [Key]
    public int Id { get; set; }
}