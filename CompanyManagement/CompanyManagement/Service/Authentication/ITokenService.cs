using Microsoft.AspNetCore.Identity;

namespace CompanyManagement.Service.Authentication;

public interface ITokenService
{
    string CreateToken(IdentityUser user, string role);
}