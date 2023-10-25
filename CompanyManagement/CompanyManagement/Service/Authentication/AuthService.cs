using Microsoft.AspNetCore.Identity;

namespace CompanyManagement.Service.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<IdentityUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthResult> RegisterAsync(string username, string password, string role)
    {
        var user = new IdentityUser { UserName = username};
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            return FailedRegistration(result, username);
        }

        await _userManager.AddToRoleAsync(user, role); // Adding the user to a role
        return new AuthResult(true,username, "");
    }

    private static AuthResult FailedRegistration(IdentityResult result, string username)
    {
        var authResult = new AuthResult(false,username, "");

        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }
    
    public async Task<AuthResult> LoginAsync(string username, string password)
    {
        var managedUser = await _userManager.FindByNameAsync(username);
        var userRole = await _userManager.GetRolesAsync(managedUser);

        if (managedUser == null)
        {
            return InvalidUsername(username);
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, password);
        if (!isPasswordValid)
        {
            return InvalidPassword(managedUser.UserName);
        }

        var accessToken = _tokenService.CreateToken(managedUser, userRole[0]);

        return new AuthResult(true, managedUser.UserName, accessToken);
    }

    private static AuthResult InvalidUsername(string username)
    {
        var result = new AuthResult(false, username, "");
        result.ErrorMessages.Add("Bad credentials", "Invalid username");
        return result;
    }

    private static AuthResult InvalidPassword(string userName)
    {
        var result = new AuthResult(false, userName, "");
        result.ErrorMessages.Add("Bad credentials", "Invalid password");
        return result;
    }
}