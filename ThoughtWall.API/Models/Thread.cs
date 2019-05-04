using System.Collections.Generic;

namespace ThoughtWall.API.Models
{
    public class Thread
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}