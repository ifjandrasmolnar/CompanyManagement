using CompanyManagement.Model;
using CompanyManagement.Service.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace CompanyManagement.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authenticationService;

    public AuthController(IAuthService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    private void AddErrors(AuthResult result)
    {
        foreach (var error in result.ErrorMessages)
        {
            ModelState.AddModelError(error.Key, error.Value);
        }
    }

    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] LoginModel model)
    {
        if (model != null)
        {
            string username = model.Username;
            string password = model.Password;
            
            var result = await _authenticationService.LoginAsync(username, password);

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            return Ok(new AuthResponse(result.UserName, result.Token));
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return BadRequest(ModelState);
    }
}