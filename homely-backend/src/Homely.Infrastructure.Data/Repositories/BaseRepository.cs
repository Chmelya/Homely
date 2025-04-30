using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Base;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Homely.Infrastructure.Data.Repositories;

public abstract class BaseRepository<TEntity>(ApplicationDbContext context) : IBaseRepository<TEntity>
     where TEntity : Entity
{
    protected DbSet<TEntity> Get(bool isAsNoTracking = false)
    {
        DbSet<TEntity> dbSet = context.Set<TEntity>();

        if (isAsNoTracking)
        {
            dbSet.AsNoTracking();
        }

        return dbSet;
    }

    protected IQueryable<TEntity> GetAsSplitable(bool isAsNoTracking = false)
    {
        return Get(isAsNoTracking).AsSplitQuery();
    }

    public async Task AddAsync(TEntity entity,
        CancellationToken cancellationToken = default)
    {
        await context.Set<TEntity>().AddAsync(entity, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task AddManyAsync(IEnumerable<TEntity> entities,
        CancellationToken cancellationToken = default)
    {
        await context.Set<TEntity>().AddRangeAsync(entities, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TEntity entity,
        CancellationToken cancellationToken = default)
    {
        context.Set<TEntity>().Update(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateManyAsync(IEnumerable<TEntity> entities,
        CancellationToken cancellationToken = default)
    {
        context.Set<TEntity>().UpdateRange(entities);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<TEntity?> GetAsync(
        Expression<Func<TEntity, bool>> predicate,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        return await Get(isAsNoTracking)
            .FirstOrDefaultAsync(predicate);
    }

    public virtual async Task<List<TEntity>> FindManyAsync(
        Expression<Func<TEntity, bool>> predicate,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        IQueryable<TEntity> query = GetAsSplitable(isAsNoTracking);

        return await query
            .Where(predicate)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<TEntity>> GetAllAsList(bool isAsNoTracking = false,
        CancellationToken cancellationToken = default)
    {
        return await GetAsSplitable(isAsNoTracking).ToListAsync(cancellationToken);
    }
}