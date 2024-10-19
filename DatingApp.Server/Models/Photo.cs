namespace DatingApp.Server.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string? Url { get; set; }
        public DateTime DateAdded { get; set; }
        public string? Description { get; set; }
        public bool IsMain { get; set; }

        //we get this prop as a response from Cloudinary after uploading photo, we need for DB saving
        public string? PublicId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}