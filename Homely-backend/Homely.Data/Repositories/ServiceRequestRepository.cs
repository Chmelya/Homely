using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Business;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Homely.Infrastructure.Data.Repositories;

public class ServiceRequestRepository(ApplicationDbContext context)
    : BaseRepository<ServiceRequest>(context),
    IServiceRequestRepository
{
    public async Task<ServiceRequest?> GetWithDetails(
        Expression<Func<ServiceRequest, bool>> predicate,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        return await Get(isAsNoTracking)
            .Include(r => r.Details)
            .FirstOrDefaultAsync(predicate, cancellationToken);
    }
}