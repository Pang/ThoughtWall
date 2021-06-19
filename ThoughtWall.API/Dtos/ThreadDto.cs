using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Dtos
{
    public class ThreadPostDto
    {
        public string Username { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "Your title must be between 4 to 50 characters")]
        public string Title { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 4, ErrorMessage = "Your post must be between 4 to 1000 characters")]
        public string Body { get; set; }
    }
    public class ThreadGetDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime TimeStamp { get; set; }
        
        public User User { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}