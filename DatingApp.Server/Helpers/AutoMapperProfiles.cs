using System.Diagnostics.Metrics;
using AutoMapper;
using DatingApp.Server.DTOs;
using DatingApp.Server.Models;

namespace DatingApp.Server.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => opt.MapFrom<AgeResolver>());

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => opt.MapFrom<AgeResolver>());

            CreateMap<Photo, PhotoForDetailedDto>().ReverseMap();
     
        }
    }
}
