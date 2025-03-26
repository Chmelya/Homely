using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers.Base;

[ApiController]
[Route("/api")]
public abstract class ApiController : ControllerBase
{
}