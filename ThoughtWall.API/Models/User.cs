using System;
using System.Collections.Generic;

namespace ThoughtWall.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string EmailAddress { get; set; }
        public ICollection<Thread> Threads { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}