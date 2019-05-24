using System.ComponentModel.DataAnnotations;

namespace ThoughtWall.API.Dtos
{
    public class CommentPostDto
    {
        [Required]
        public string ThreadId { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 3, ErrorMessage = "Your message must be between 3 to 255 characters")]
        public string Body { get; set; }
    }
}