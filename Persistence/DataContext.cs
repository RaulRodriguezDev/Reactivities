using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities {get; set;}
        public DbSet<ActivityAtendee> ActivityAtendee { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAtendee>(x => x.HasKey(a => new {a.AppUserId, a.ActivityId}));
            builder.Entity<ActivityAtendee>().HasOne(u => u.AppUser).WithMany(a => a.Activities).HasForeignKey(u => u.AppUserId);
            builder.Entity<ActivityAtendee>().HasOne(a => a.Activity).WithMany(u => u.Atendees).HasForeignKey(a => a.ActivityId);

        }
    }
}