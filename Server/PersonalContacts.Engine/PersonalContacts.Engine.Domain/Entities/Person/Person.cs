using PersonalContacts.Engine.Domain.Base;
using PersonalContacts.Engine.Domain.ValueObjects;

namespace PersonalContacts.Engine.Domain.Entities.Person
{
    public class Person : BaseEntity<int>
    {
        public string FirstName { get; private set; }
        public string Surname { get; private set; }
        public DateTime DoB { get; private set; }
        public Address Address { get; private set; }
        public string PhoneNumber { get; private set; }
        public string IBAN { get; private set; }

        public Person(
            string firstName,
            string surname,
            DateTime dob,
            Address address,
            string phoneNumber,
            string iban)
        {
            this.Update(
                firstName,
                surname,
                dob,
                address,
                phoneNumber,
                iban
            );
        }

        public void Update(
            string firstName,
            string surname,
            DateTime dob,
            Address address,
            string phoneNumber,
            string iban)
        {
            FirstName = firstName;
            Surname = surname;
            Address = address;
            DoB = dob;
            PhoneNumber = phoneNumber;
            IBAN = iban;
        }

        public void AddAddress(Address address)
        {
            Address = address;
        }
    }
}
