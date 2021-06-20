using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ThoughtWall.API.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int BookingOwnerId { get; set; }
        public int BookedWithUserId { get; set; }
        public DateTimeOffset RequestedDT { get; set; }
        public int StatusId { get; set; }
        public DateTime BookingCreated { get; set; }
        public DateTime BookingUpdated { get; set; }

        public virtual User BookingOwner { get; set; }
        public virtual User BookedWithUser { get; set; }
        public DimBookingStatus Status { get; set; }
    }
}