using IdentityManagment.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace IdentityManagment.Core.Interfaces
{
    public interface IUserRepository:IGenericRepository<User>
    {
        Task<IEnumerable<UserRoles>> GetUsersWithRoles();
    }
}
