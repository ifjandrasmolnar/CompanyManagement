using CompanyManagement.Model;
using CompanyManagement.Models;
using CompanyManagement.Repositories;
using CompanyManagement.Service.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace CompanyManagement.Controllers;
using Newtonsoft.Json.Linq;

[ApiController]
[Route("api")]

public class EmployeesController : ControllerBase
{
    private readonly UsersContext _usersContext;
    private readonly IUsersRepository _usersRepository;
    private readonly IAuthService _authenticationService;
    
    public EmployeesController(IAuthService authenticationService)
    {
        _authenticationService = authenticationService;
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
    
    [HttpPost("DeleteUser"), Authorize(Roles="Admin")]
    public IActionResult DeleteUser([FromBody] DeleteModel model)
    {
        Console.WriteLine(model.Id);
        
        if (model != null)
        {
            _usersRepository.DeleteUser(model.Id);
            
            return Ok("Delete success!");
        }
        return NotFound("User not found!");
    }
    
    [HttpPost("CreateUser"), Authorize(Roles="Admin")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserModel model)
    {
        if (model != null)
        {
            string? username = model.Username;
            string? email = model.Email;
            string? password = model.Password;
            string? role = model.Role;
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authenticationService.RegisterAsync(email, username, password, role);

            if (!result.Success)
            {
                return BadRequest(ModelState);
            }
            
            return Ok("OK");
        }

        return BadRequest("Something went wrong !");
    }
}