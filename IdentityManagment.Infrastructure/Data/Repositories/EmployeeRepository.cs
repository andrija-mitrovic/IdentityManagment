using IdentityManagment.Core.Interfaces;
using IdentityManagment.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace IdentityManagment.Infrastructure.Data.Repositories
{
    public class EmployeeRepository:GenericRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context):base(context) { }
    }
}
