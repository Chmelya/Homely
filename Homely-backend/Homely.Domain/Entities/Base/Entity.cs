using System.ComponentModel.DataAnnotations;

namespace Homely.Domain.Entities.Base;

public abstract class Entity
{
    public int Id { get; set; }
}