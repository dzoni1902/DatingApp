
using System.Diagnostics.Metrics;
using DatingApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }

    }
}
