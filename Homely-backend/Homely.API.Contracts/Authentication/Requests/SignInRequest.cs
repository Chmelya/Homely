using System.ComponentModel.DataAnnotations;

namespace Homely.API.Contracts.Authentication.Requests;

public record SignInRequest([Required] string UserName, [Required] string Password);