using PersonalContacts.Engine.Data.Repositories.Query.Base;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Data.Repositories.Query
{
    public class PersonQueryRepository : BaseQueryRepository<Person>, IPersonQueryRepository
    {
        public PersonQueryRepository(EFContext dbContext) : base(dbContext)
        {
        }
    }
}
