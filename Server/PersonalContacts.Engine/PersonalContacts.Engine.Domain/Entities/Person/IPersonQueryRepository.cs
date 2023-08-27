using PersonalContacts.Engine.Domain.Interfaces;

namespace PersonalContacts.Engine.Domain.Entities.Person
{
    public interface IPersonQueryRepository : IQueryRepository<Person>
    {
        // add some specific to Person queries
    }
}
