using System.ComponentModel.DataAnnotations;

namespace ThoughtWall.API.Dtos
{
    public class ThreadPostDto
    {
        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Body { get; set; }
    }
}