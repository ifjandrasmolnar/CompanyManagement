using CompanyManagement.Model;
using CompanyManagement.Models;
using CompanyManagement.Repositories;
using CompanyManagement.Service.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompanyManagement.Controllers;

[ApiController]
[Route("api")]

public class EmployeesController : ControllerBase
{
    private readonly UsersContext _usersContext;
    private readonly IUsersRepository _usersRepository;
    
    public EmployeesController()
    {
        var options = new DbContextOptionsBuilder<UsersContext>()
            .UseSqlServer("Server=localhost,1433;Database=CompanyManagement;User Id=sa;Password=yourStrong(!)Password;")
            .Options;

        _usersContext = new UsersContext(options);
        _usersRepository = new UsersRepository(_usersContext);
    }
    
    [HttpGet("GetEmployees"), Authorize(Roles="Admin")]
    public async Task<ActionResult> GetEmployees()
    {
        List<IdentityUser> employees = _usersRepository.GetAllUsers();
        List<IdentityRole> roles = _usersRepository.GetAllRoles();
        List<IdentityUserRole<string>> userRoles = _usersRepository.GetAllUserRoles();

        var obj = new
        {
            employees = employees,
            roles = roles,
            userRoles = userRoles
        };
        
        return Ok(obj);
    }
}