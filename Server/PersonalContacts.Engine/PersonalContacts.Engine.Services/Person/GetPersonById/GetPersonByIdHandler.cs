using FluentValidation;
using MediatR;
using PersonalContacts.Engine.ApiModels;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Handlers.Person.GetPersonById
{
    public class GetPersonByIdHandler : IRequestHandler<GetPersonByIdRequest, GetPersonByIdResponse>
    {
        private readonly IPersonQueryRepository _personQueryRepository;
        private readonly IGetPersonByIdValidator _modelValidator;

        public GetPersonByIdHandler(
            IPersonQueryRepository personQueryRepository, 
            IGetPersonByIdValidator modelValidator)
        {
            _personQueryRepository = personQueryRepository
                ?? throw new ArgumentNullException(nameof(personQueryRepository));
            _modelValidator = modelValidator ?? throw new ArgumentNullException(nameof(modelValidator));
        }

        public async Task<GetPersonByIdResponse> Handle(GetPersonByIdRequest request, CancellationToken cancellationToken)
        {
            _modelValidator.ValidateAndThrow(request);

            var result = await _personQueryRepository.GetAsync(p => p.Id == request.PersonId).ConfigureAwait(false);

            if (result == null) throw new Exception("Person not found.");

            return new GetPersonByIdResponse 
            {
                PersonModel = new PersonModel
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
                }
            };
        }
    }
}
