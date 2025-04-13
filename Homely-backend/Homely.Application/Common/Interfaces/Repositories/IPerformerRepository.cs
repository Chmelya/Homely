using Homely.Application.Common.HelperModels;
using Homely.Domain.Entities.Business;
using Homely.Domain.Enums;

namespace Homely.Application.Common.Interfaces.Repositories;

public interface IPerformerRepository : IBaseRepository<Performer>
{
    Task<List<DropdownValue>> GetPerformersByCategory(Category category, CancellationToken cancellation = default);
}