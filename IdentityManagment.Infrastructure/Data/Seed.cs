using System.Collections.Generic;
using System.Linq;
using IdentityManagment.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityManagment.Infrastructure.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public Seed(UserManager<User> userManager,
                    RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _userManager=userManager;
        }

        public void SeedUsers()
        {
            if(!_userManager.Users.Any())
            {
                var roles=new List<Role>
                {
                    new Role{Name="Admin"},
                    new Role{Name="Create"},
                    new Role{Name="Read"},
                    new Role{Name="Update"},
                    new Role{Name="Delete"}
                };

                foreach(var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                var adminUser=new User
                {
                    UserName="Admin"
                };

                var result=_userManager.CreateAsync(adminUser, "password").Result;

                if(result.Succeeded)
                {
                    var admin=_userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRoleAsync(admin, "Admin").Wait();
                }
            }
        }
    }
}