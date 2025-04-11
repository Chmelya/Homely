﻿using Homely.Application.Authentication.Requests;
using Homely.Domain.Entities.Common;
using System.Linq.Expressions;

namespace Homely.Application.Common.Interfaces.Repositories;

public interface IUserRepository : IBaseRepository<User>
{
    Task AddResident(SignUpRequest request);

    Task<User?> GetWithRole(Expression<Func<User, bool>> predicate, CancellationToken cancellationToken = default);
}