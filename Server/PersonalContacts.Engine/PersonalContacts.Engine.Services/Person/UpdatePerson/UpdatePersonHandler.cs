using FluentValidation;
using MediatR;
using PersonalContacts.Engine.ApiModels;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Handlers.Person.UpdatePerson
{
    public class UpdatePersonHandler : IRequestHandler<UpdatePersonRequest, UpdatePersonResponse>
    {
        private readonly IPersonCommandRepository _personCommandRepository;
        private readonly IUpdatePersonValidator _modelValidator;
        private readonly IPersonValidator _entityValidator;

        public UpdatePersonHandler(
            IPersonCommandRepository personCommandRepository, 
            IUpdatePersonValidator modelValidator,
            IPersonValidator entityValidator)
        {
            _personCommandRepository = personCommandRepository
                ?? throw new ArgumentNullException(nameof(personCommandRepository));
            _modelValidator = modelValidator ?? throw new ArgumentNullException(nameof(modelValidator));
            _entityValidator = entityValidator ?? throw new ArgumentNullException(nameof(entityValidator));
        }

        public async Task<UpdatePersonResponse> Handle(UpdatePersonRequest request, CancellationToken cancellationToken)
        {
            _modelValidator.ValidateAndThrow(request);

            var person = Domain.Entities.Person.Person.CreateNew(
                request.PersonModel.FirstName,
                request.PersonModel.Surname,
                request.PersonModel.BirthDate,
                new Domain.ValueObjects.Address(
                    request.PersonModel.Country,
                    request.PersonModel.City,
                    request.PersonModel.Street,
                    request.PersonModel.ZipCode
                    ),
                request.PersonModel.PhoneNumber,
                request.PersonModel.Iban,
                _entityValidator);

            var result = await _personCommandRepository.UpdateAsync(person).ConfigureAwait(false);
            await _personCommandRepository.CommitAsync().ConfigureAwait(false);

            if (result == null) throw new Exception("Cannot update Person.");

            return new UpdatePersonResponse 
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
