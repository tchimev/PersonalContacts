using PersonalContacts.Engine.Data.Repositories.Query.Base;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Data.Repositories.Query
{
    public class PersonCommandRepository : BaseCommandRepository<Person>, IPersonQueryRepository
    {
        public PersonCommandRepository(EFContext dbContext) : base(dbContext)
        {
        }
    }
}
