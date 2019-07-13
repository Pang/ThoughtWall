using System;
using System.Collections.Generic;

namespace ThoughtWall.API.Models
{
    public class Thread
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime TimeStamp { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}