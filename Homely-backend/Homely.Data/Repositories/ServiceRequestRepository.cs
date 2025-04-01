using Homely.Application.Common.Interfaces.Repositories;
using Homely.Domain.Entities.Business;

namespace Homely.Infrastructure.Data.Repositories;

public class ServiceRequestRepository(ApplicationDbContext context)
    : BaseRepository<ServiceRequest>(context),
    IServiceRequestRepository;