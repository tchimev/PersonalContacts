using MediatR;
using PersonalContacts.Engine.ApiModels;

namespace PersonalContacts.Engine.Handlers.Person.CreatePerson
{
    public class CreatePersonRequest : IRequest<CreatePersonResponse>
    {
        public PersonModel PersonModel { get; set; }
    }
}
