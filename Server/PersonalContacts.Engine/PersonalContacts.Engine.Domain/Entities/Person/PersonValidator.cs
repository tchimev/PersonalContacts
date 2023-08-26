using FluentValidation;
using System.Text.RegularExpressions;

namespace PersonalContacts.Engine.Domain.Entities.Person
{
    public class PersonValidator : AbstractValidator<Person>
    {
        public PersonValidator() 
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.Surname).NotEmpty();
            RuleFor(x => x.BirthDate).NotEmpty().Must(BeValidDoB).WithMessage("Date of birth is not valid.");
            RuleFor(x => x.PhoneNumber).NotEmpty().Must(BeValidPhoneNumber).WithMessage("Phone number must contain only numbers.");
            RuleFor(x => x.Iban).NotEmpty().Must(BeValidIBAN).WithMessage("IBAN must contain numbers and letters only.");
            RuleFor(x => x.Address.Country).NotEmpty().When(x => x.Address != null);
            RuleFor(x => x.Address.City).NotEmpty().When(x => x.Address != null);
            RuleFor(x => x.Address.Street).NotEmpty().When(x => x.Address != null);
        }

        private bool BeValidDoB(DateTime date)
        {
            return (date.Date < DateTime.Today && date.Date >= DateTime.Today.Date.AddYears(-100));
        }

        private bool BeValidPhoneNumber(string phoneNumber)
        {
            return Regex.IsMatch(phoneNumber, "^[0-9]+$");
        }

        private bool BeValidIBAN(string iban)
        {
            return Regex.IsMatch(iban, "^[A-Z]+[0-9]+[A-Z]+[0-9]+$");
        }
    }
}
