using System.ComponentModel.DataAnnotations;

namespace ThoughtWall.API.Dtos
{
    public class ThreadPostDto
    {
        [Required]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "Your title must be between 4 to 50 characters")]

        public string Title { get; set; }
        
        [Required]
        [StringLength(1000, MinimumLength = 4, ErrorMessage = "Your post must be between 4 to 1000 characters")]

        public string Body { get; set; }
    }
}