using MediatR;

namespace PersonalContacts.Engine.Handlers.Person.GetPersonById
{
    public class GetPersonByIdRequest : IRequest<GetPersonByIdResponse>
    {
        public int PersonId { get; set; }
    }
}
