using MediatR;
using PersonalContacts.Engine.ApiModels;

namespace PersonalContacts.Engine.Handlers.Person.UpdatePerson
{
    public class UpdatePersonRequest : IRequest<UpdatePersonResponse>
    {
        public PersonModel PersonModel { get; set; }
    }
}
