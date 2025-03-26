using Homely.Application.Common.Interfaces.Repositoreis;
using Homely.Domain.Entities;

namespace Homely.Infrastructure.Data.Repositories;

public class UserRepository(ApplicationDbContext context) : BaseRepository<User>(context), IUserRepository;