using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IdentityManagment.Core.DTOs
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4,ErrorMessage = "Password must be between 4 and 8 characters")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public DateTime LastActive { get; set; } = DateTime.Now;
        [Required]
        public DateTime Created { get; set; } = DateTime.Now;
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
