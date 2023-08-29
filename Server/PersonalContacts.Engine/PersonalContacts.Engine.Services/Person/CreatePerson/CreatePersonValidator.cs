using FluentValidation;

namespace PersonalContacts.Engine.Handlers.Person.CreatePerson
{
    public class CreatePersonValidator : AbstractValidator<CreatePersonRequest>, ICreatePersonValidator
    {
        public CreatePersonValidator() 
        {
            RuleFor(x => x.PersonModel).NotEmpty();
            RuleFor(x => x.PersonModel.FirstName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.PersonModel.Surname).NotEmpty().MaximumLength(50);
            RuleFor(x => x.PersonModel.BirthDate).NotEmpty();
            RuleFor(x => x.PersonModel.PhoneNumber).NotEmpty();
            RuleFor(x => x.PersonModel.Iban).NotEmpty().MaximumLength(34);
            RuleFor(x => x.PersonModel.Country).NotEmpty();
            RuleFor(x => x.PersonModel.City).NotEmpty();
            RuleFor(x => x.PersonModel.Street).NotEmpty().MaximumLength(150);
        }
    }

    public interface ICreatePersonValidator : IValidator<CreatePersonRequest> { }
}
