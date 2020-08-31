using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManagment.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IEmployeeRepository ToDoItems { get; }
        Task<bool> SaveAsync();
    }
}
