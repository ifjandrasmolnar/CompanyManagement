﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CompanyManagement.Models;

public class UsersContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public UsersContext (DbContextOptions<UsersContext> options)
        : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // It would be a good idea to move the connection string to user secrets
        options.UseSqlServer("Server=localhost,1433;Database=CompanyManagement;User Id=sa;Password=yourStrong(!)Password;");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}