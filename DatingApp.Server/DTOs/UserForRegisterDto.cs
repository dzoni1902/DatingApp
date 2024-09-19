using System.ComponentModel.DataAnnotations;
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
    }
}
