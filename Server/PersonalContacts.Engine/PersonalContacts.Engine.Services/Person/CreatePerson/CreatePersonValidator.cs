using FluentValidation;
using PersonalContacts.Engine.ApiModels;

namespace PersonalContacts.Engine.Handlers.Person.CreatePerson
{
    public class CreatePersonValidator : AbstractValidator<PersonModel>, ICreatePersonValidator
    {
        public CreatePersonValidator() 
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Surname).NotEmpty().MaximumLength(50);
            RuleFor(x => x.BirthDate).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.Iban).NotEmpty().MaximumLength(34);
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Street).NotEmpty().MaximumLength(150);
        }
    }

    public interface ICreatePersonValidator : IValidator<PersonModel> { }
}
