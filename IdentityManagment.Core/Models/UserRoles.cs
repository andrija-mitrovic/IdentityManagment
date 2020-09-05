using System;
using System.Collections.Generic;
using System.Text;

namespace IdentityManagment.Core.Models
{
    public class UserRoles
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
