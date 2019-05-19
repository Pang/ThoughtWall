using System.ComponentModel.DataAnnotations;

namespace ThoughtWall.API.Dtos
{
    public class CommentPostDto
    {
        [Required]
        public string ThreadId { get; set; }
        [Required]
        public string Body { get; set; }
    }
}