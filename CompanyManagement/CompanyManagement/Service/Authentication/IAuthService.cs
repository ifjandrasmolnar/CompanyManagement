namespace CompanyManagement.Service.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string username, string password, string role);
    Task<AuthResult> LoginAsync(string username, string password);
}