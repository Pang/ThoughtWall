
using Microsoft.EntityFrameworkCore;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                        .HasOne(b => b.BookingOwner)
                        .WithMany(u => u.BookingsCreated)
                        .HasForeignKey(b => b.BookingOwnerId)
                        .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Booking>()
                        .HasOne(b => b.BookedWithUser)
                        .WithMany(u => u.BookingsReceived)
                        .HasForeignKey(b => b.BookedWithUserId)
                        .OnDelete(DeleteBehavior.SetNull);
        }
    }
}