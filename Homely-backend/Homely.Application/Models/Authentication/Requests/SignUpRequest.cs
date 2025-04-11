using System.ComponentModel.DataAnnotations;

namespace Homely.Application.Models.Authentication.Requests;

public record SignUpRequest(
    [Required] string Email,
    [Required] string Password,
    [Required] string FirstName,
    string? MiddleName,
    [Required] string LastName);