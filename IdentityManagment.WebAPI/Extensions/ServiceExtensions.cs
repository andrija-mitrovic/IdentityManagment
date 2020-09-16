using IdentityManagment.Core.Interfaces;
using IdentityManagment.Core.Models;
using IdentityManagment.Infrastructure.Data;
using IdentityManagment.Infrastructure.Data.Repositories;
using IdentityManagment.Infrastructure.Data.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManagment.WebAPI.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureAuthorization(this IServiceCollection services)
        {
            services.AddAuthorization(options => {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                /*options.AddPolicy("ModerateEmployeeCreateRole", policy => policy.RequireRole("Admin", "Create", 
                    "Update", "Read", "Delete"));*/
                options.AddPolicy("EmployeeCreateRole", policy => policy.RequireRole("Admin", "Create"));
                options.AddPolicy("EmployeeDeleteRole", policy => policy.RequireRole("Admin", "Delete"));
                options.AddPolicy("EmployeeUpdateRole", policy => policy.RequireRole("Admin", "Update"));
                options.AddPolicy("EmployeeReadRole", policy => policy.RequireRole("Admin", "Read"));
            });
        }

        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration config)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(config.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        public static void ConfigureControllers(this IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                options.Filters.Add(new AuthorizeFilter(policy));
            });
        }
    }
}
