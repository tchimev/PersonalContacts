using MediatR;
using PersonalContacts.Engine.ApiModels;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Handlers.Person.GetPersonList
{
    public class GetPersonListHandler : IRequestHandler<GetPersonListRequest, GetPersonListResponse>
    {
        private readonly IPersonQueryRepository _personQueryRepository;

        public GetPersonListHandler(
            IPersonQueryRepository personQueryRepository)
        {
            _personQueryRepository = personQueryRepository
                ?? throw new ArgumentNullException(nameof(personQueryRepository));
        }

        public async Task<GetPersonListResponse> Handle(GetPersonListRequest request, CancellationToken cancellationToken)
        {
            var results = await _personQueryRepository.ListAsync().ConfigureAwait(false);

            var list = new List<PersonModel>();
            foreach (var result in results)
            {
                list.Add(new PersonModel
                {
                    Id = result.Id,
                    BirthDate = result.BirthDate,
                    City = result.Address.City,
                    Country = result.Address.Country,
                    FirstName = result.FirstName,
                    Iban = result.Iban,
                    PhoneNumber = result.PhoneNumber,
                    Street = result.Address.Street,
                    Surname = result.Surname,
                    ZipCode = result.Address.ZipCode
                });
            }

            return new GetPersonListResponse 
            {
                PersonList = list
            };
        }
    }
}
