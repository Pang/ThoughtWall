using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ThoughtWall.API.Models
{
    public class User
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public string Username { get; set; }
        [MaxLength(150)]
        public string Bio { get; set; }
        [MaxLength(50)]
        public string Country { get; set; }
        public DateTime Dob { get; set; }
        public bool BookingsEnabled { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [MaxLength(100)]
        public string EmailAddress { get; set; }

        public ICollection<Thread> Threads { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Booking> BookingsCreated{ get; set; }
        public virtual ICollection<Booking> BookingsReceived{ get; set; }
    }
}