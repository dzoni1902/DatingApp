using System.ComponentModel.DataAnnotations;
using DatingApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Server.DTOs
{
    public class UserForRegisterDto
    {
        //validations should be added here, since that only makes sense

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password needs to have between 4 and 8 characters.")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        
        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; } 

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
