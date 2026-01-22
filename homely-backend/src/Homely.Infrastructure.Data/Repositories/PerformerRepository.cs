using Homely.Application.Common.HelperModels;
using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Business;
using Homely.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Homely.Infrastructure.Data.Repositories;

public class PerformerRepository(ApplicationDbContext context)
    : BaseRepository<Performer>(context),
    IPerformerRepository
{
    public async Task<List<DropdownValue>> GetPerformersByCategory(
        Category category,
        CancellationToken cancellation = default)
    {
        return await Get(isAsNoTracking: true)
            .Where(p => p.Category == category)
            .Select(p => new DropdownValue { Key = p.Id, Value = p.Name })
            .ToListAsync(cancellationToken: cancellation);
    }
}