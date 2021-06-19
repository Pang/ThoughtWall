using System;
using System.ComponentModel.DataAnnotations;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Data
{
    public class BookingDto
    {
        public int Id { get; set; }
        public int BookingOwnerId { get; set; }
        public int BookedWithUserId { get; set; }
        public DateTime RequestedDT { get; set; }
        public int StatusId { get; set; }
        public DateTime BookingCreated { get; set; }
        public DateTime BookingUpdated { get; set; }

        public virtual ProfileDto BookingOwner { get; set; }
        public virtual ProfileDto BookedWithUser { get; set; }
        public DimBookingStatus Status { get; set; }
    }
}