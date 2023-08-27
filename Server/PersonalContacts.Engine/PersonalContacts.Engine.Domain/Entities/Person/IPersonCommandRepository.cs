using PersonalContacts.Engine.Domain.Interfaces;

namespace PersonalContacts.Engine.Domain.Entities.Person
{
    public interface IPersonCommandRepository : ICommandRepository<Person>
    {
        // add some specific to Person commands
    }
}
