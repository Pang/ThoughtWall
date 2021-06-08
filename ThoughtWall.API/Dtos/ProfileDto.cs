using System;
using System.ComponentModel.DataAnnotations;

namespace ThoughtWall.API.Data
{
    public class ProfileDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        [StringLength(150)]
        public string Bio { get; set; }
        [StringLength(50)]
        public string Country { get; set; }
        public DateTime Dob { get; set; }
    }
}