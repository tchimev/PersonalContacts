namespace PersonalContacts.Engine.Domain.ValueObjects
{
    public sealed class Address
    {
        public string Country { get; private set; }
        public string City { get; private set; }
        public string Street { get; private set; }
        public string ZipCode { get; private set; }

        public Address(string country, string city, string street, string zipCode)
        {
            Country = country;
            City = city;
            Street = street;
            ZipCode = zipCode;
        }
    }
}
