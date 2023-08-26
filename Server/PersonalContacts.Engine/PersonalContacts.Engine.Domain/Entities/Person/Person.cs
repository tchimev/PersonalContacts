using PersonalContacts.Engine.Domain.Base;
using PersonalContacts.Engine.Domain.ValueObjects;

namespace PersonalContacts.Engine.Domain.Entities.Person
{
    public sealed class Person : BaseEntity<int>
    {
        public string FirstName { get; private set; }
        public string Surname { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string PhoneNumber { get; private set; }
        public string Iban { get; private set; }
        public Address Address { get; private set; }

        private Person() { }

        public Person(
            string firstName,
            string surname,
            DateTime birthDate,
            Address address,
            string phoneNumber,
            string iban)
        {
            FirstName = firstName;
            Surname = surname;
            BirthDate = birthDate;
            Address = address;
            PhoneNumber = phoneNumber;
            Iban = iban;
        }

        public void Update(
            string firstName,
            string surname,
            DateTime birthDate,
            Address address,
            string phoneNumber,
            string iban)
        {
            FirstName = firstName;
            Surname = surname;
            Address = address;
            BirthDate = birthDate;
            PhoneNumber = phoneNumber;
            Iban = iban;
        }

        public void AddAddress(Address address)
        {
            Address = address;
        }
    }
}
