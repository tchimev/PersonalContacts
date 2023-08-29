using FluentValidation;
using PersonalContacts.Engine.ApiModels;

namespace PersonalContacts.Engine.Handlers.Person.DeletePerson
{
    public class DeletePersonValidator : AbstractValidator<DeletePersonRequest>, IDeletePersonValidator
    {
        public DeletePersonValidator() 
        {
            RuleFor(x => x.PersonId).NotEmpty();
        }
    }

    public interface IDeletePersonValidator : IValidator<DeletePersonRequest> { }
}
