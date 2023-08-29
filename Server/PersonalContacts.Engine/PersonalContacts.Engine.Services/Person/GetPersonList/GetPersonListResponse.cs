using PersonalContacts.Engine.ApiModels;

namespace PersonalContacts.Engine.Handlers.Person.GetPersonList
{
    public class GetPersonListResponse
    {
        public IEnumerable<PersonModel> PersonList { get; set; }
    }
}
