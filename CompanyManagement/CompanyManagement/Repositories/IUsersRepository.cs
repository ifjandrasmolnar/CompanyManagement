using Microsoft.AspNetCore.Identity;

namespace CompanyManagement.Repositories;

public interface IUsersRepository
{
    List<IdentityUser> GetAllUsers();
    List<IdentityRole> GetAllRoles();
    List<IdentityUserRole<string>> GetAllUserRoles();
    int DeleteUser(string id);
}