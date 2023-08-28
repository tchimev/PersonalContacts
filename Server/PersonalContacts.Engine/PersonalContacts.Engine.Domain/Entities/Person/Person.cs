using PersonalContacts.Engine.Domain.Base;
using PersonalContacts.Engine.Domain.ValueObjects;

namespace PersonalContacts.Engine.Domain.Entities.Person
{
    public class Person : BaseEntity<int>
    {
        public string FirstName { get; private set; }
        public string Surname { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Iban { get; private set; }
        public Address Address { get; private set; }

        private Person() { }

        public static Person CreateNew(
            string firstName,
            string surname,
            DateTime birthDate,
            Address address,
            string phoneNumber,
            string iban,
            IPersonValidator validator)
        {
            var person = new Person
            {
                FirstName = firstName,
                Surname = surname,
                BirthDate = birthDate,
                Address = address,
                PhoneNumber = phoneNumber,
                Iban = iban
            };

            validator.ValidateEntity(person);
            
            return person;
        }

        public void Update(
            string firstName,
            string surname,
            DateTime birthDate,
            Address address,
            string phoneNumber,
            string iban,
            IPersonValidator validator)
        {
            FirstName = firstName;
            Surname = surname;
            Address = address;
            BirthDate = birthDate;
            PhoneNumber = phoneNumber;
            Iban = iban;

            validator.ValidateEntity(this);
        }

        public void AddAddress(Address address, IPersonValidator validator)
        {
            Address = address;

            validator.ValidateEntityProperty(this, nameof(Address));
        }

        public void AddIBAN(string iban, IPersonValidator validator)
        {
            Iban = iban;

            validator.ValidateEntityProperty(this, nameof(Iban));
        }

        public void AddPhoneNumber(string phoneNumber, IPersonValidator validator)
        {
            PhoneNumber = phoneNumber;

            validator.ValidateEntityProperty(this, nameof(PhoneNumber));
        }
    }
}
