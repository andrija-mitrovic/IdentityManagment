using IdentityManagment.Core.Interfaces;
using IdentityManagment.Infrastructure.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManagment.Infrastructure.Data.UnitOfWork
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private IEmployeeRepository _employees;
        private IUserRepository _users;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEmployeeRepository Employees
            => _employees = _employees ?? new EmployeeRepository(_context);

        public IUserRepository Users
            => _users = _users ?? new UserRepository(_context);

        public async Task<bool> SaveAsync()
            => await _context.SaveChangesAsync() > 0;

        public void Dispose()
            => _context.Dispose();
    }
}
