
using Microsoft.EntityFrameworkCore;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext (DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<Thread> Threads { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}