using AutoMapper;
using DatingApp.Server.DTOs;
using DatingApp.Server.Models;

namespace DatingApp.Server.Helpers
{
    public class AgeResolver : IValueResolver<User, UserForListDto, int>
    {
        public int Resolve(User source, UserForListDto destination, int destMember, ResolutionContext context)
        {
            var today = DateTime.Today;
            var age = today.Year - source.DateOfBirth.Year;
            if (source.DateOfBirth.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
