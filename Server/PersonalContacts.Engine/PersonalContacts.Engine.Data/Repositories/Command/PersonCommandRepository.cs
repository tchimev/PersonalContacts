using PersonalContacts.Engine.Data.Repositories.Command.Base;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Data.Repositories.Command
{
    public class PersonCommandRepository : BaseCommandRepository<Person>, IPersonCommandRepository
    {
        public PersonCommandRepository(EFContext dbContext) : base(dbContext)
        {
        }
    }
}
