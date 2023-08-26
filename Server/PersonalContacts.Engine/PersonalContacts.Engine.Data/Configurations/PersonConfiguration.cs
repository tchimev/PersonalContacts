using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Data.Configurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(x => x.Id);

            builder.OwnsOne(x => x.Address)
                .Property(x => x.ZipCode).IsRequired(false);

        }
    }
}
