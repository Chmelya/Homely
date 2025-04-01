using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Common;

namespace Homely.Infrastructure.Data.Repositories;

public class UserRepository(ApplicationDbContext context) : BaseRepository<User>(context), IUserRepository;