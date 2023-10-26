using CompanyManagement.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CompanyManagement.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly UsersContext _context;

    public UsersRepository(UsersContext context)
    {
        _context = context;
    }

    public List<IdentityUser> GetAllUsers()
    {
        List<IdentityUser> users = _context.Users.ToList();

        return users;
    }

    public List<IdentityRole> GetAllRoles()
    {
        List<IdentityRole> roles = _context.Roles.ToList();

        return roles;
    }

    public List<IdentityUserRole<string>> GetAllUserRoles()
    {
        List<IdentityUserRole<string>> userRoles = _context.UserRoles.ToList();

        return userRoles;
    }
    public int DeleteUser(string id)
    {
        var user = _context.Users.Find(id);
        
        if (user == null)
        {
            return 404; 
        }
        
        _context.Users.Remove(user);
        _context.SaveChanges();

        return 200;
    }
}