using FluentValidation;

namespace PersonalContacts.Engine.Handlers.Person.GetPersonById
{
    public class GetPersonByIdValidator : AbstractValidator<GetPersonByIdRequest>, IGetPersonByIdValidator
    {
        public GetPersonByIdValidator() 
        {
            RuleFor(x => x.PersonId).NotEmpty();
        }
    }

    public interface IGetPersonByIdValidator : IValidator<GetPersonByIdRequest> { }
}
