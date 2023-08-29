namespace PersonalContacts.Engine.ApiModels
{
    public class PersonModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Iban { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }

    }
}
