using DatingApp.Server.Models;

namespace DatingApp.Server.DTOs
{
    public class UserForDetailedDto : UserForListDto
    {
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public ICollection<PhotoForDetailedDto> Photos { get; set; }
    }
}
