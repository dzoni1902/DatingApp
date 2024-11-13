using DatingApp.Server.Models;

namespace DatingApp.Server.DTOs
{
    public class MessageForCreationDto
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string? Content { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
    }
}
