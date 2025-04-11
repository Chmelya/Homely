using System.ComponentModel.DataAnnotations;

namespace Homely.Application.Models.Authentication.Requests;

public record SignInRequest([Required] string Email, [Required] string Password);