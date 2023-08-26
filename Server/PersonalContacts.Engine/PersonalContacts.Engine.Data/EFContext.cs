using Microsoft.EntityFrameworkCore;
using PersonalContacts.Engine.Data.Configurations;

namespace PersonalContacts.Engine.Data
{
    public class EFContext : DbContext
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new PersonConfiguration());
        }
    }
}