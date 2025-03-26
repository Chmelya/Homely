using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers.Common;

[ApiController]
[Route("/api")]
public abstract class ApiController : ControllerBase
{
}