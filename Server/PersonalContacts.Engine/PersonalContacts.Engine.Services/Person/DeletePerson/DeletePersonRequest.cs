using MediatR;

namespace PersonalContacts.Engine.Handlers.Person.DeletePerson
{
    public class DeletePersonRequest : IRequest<DeletePersonResponse>
    {
        public int PersonId { get; set; }
    }
}
