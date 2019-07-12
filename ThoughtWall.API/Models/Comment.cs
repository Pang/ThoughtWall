using System;

namespace ThoughtWall.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public Thread Thread { get; set; }
        public int ThreadId { get; set; }
        public string Body { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}