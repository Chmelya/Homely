﻿using Homely.Infrastructure.Data.Entities.Common;
using System.Linq.Expressions;

namespace Homely.Infrastructure.Data.Repositories.Base.Interfaces;

public interface IBaseRepository<TEntity> where TEntity : Entity
{
    Task AddAsync(TEntity entity, CancellationToken cancellationToken = default);

    Task AddManyAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);

    Task UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);

    Task UpdateManyAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);

    Task<List<TEntity>> FindManyAsync(
        Expression<Func<TEntity, bool>> predicate,
        bool isAsNoTracking = false,
        CancellationToken cancellationToken = default);

    IQueryable<TEntity> GetAll(bool isAsNoTracking = false);

    List<TEntity> GetAllAsList(bool isAsNoTracking = false);
}