﻿using System.ComponentModel.DataAnnotations;

namespace DatingApp.Server.DTOs
{
    public class UserForLoginDto
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
