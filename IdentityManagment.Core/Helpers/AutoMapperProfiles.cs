using AutoMapper;
using IdentityManagment.Core.DTOs;
using IdentityManagment.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IdentityManagment.Core.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<EmployeeUpdateDto, Employee>();
            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<Employee, EmployeeDetailDto>();
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserLoginDto, User>();
            CreateMap<User, UserDetailDto>();
        }
    }
}
