using Microsoft.AspNetCore.Mvc;

namespace Homely.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiController : ControllerBase;