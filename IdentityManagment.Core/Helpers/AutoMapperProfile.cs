using AutoMapper;
using IdentityManagment.Core.DTOs;
using IdentityManagment.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IdentityManagment.Core.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Employee, EmployeeDto>();
            CreateMap<EmployeeDto, Employee>();
        }
    }
}
