using FluentValidation;
using MediatR;
using PersonalContacts.Engine.Domain.Entities.Person;

namespace PersonalContacts.Engine.Handlers.Person.DeletePerson
{
    public class DeletePersonHandler : IRequestHandler<DeletePersonRequest, DeletePersonResponse>
    {
        private readonly IPersonCommandRepository _personCommandRepository;
        private readonly IPersonQueryRepository _personQueryRepository;
        private readonly IDeletePersonValidator _modelValidator;

        public DeletePersonHandler(
            IPersonCommandRepository personCommandRepository, 
            IPersonQueryRepository personQueryRepository, 
            IDeletePersonValidator modelValidator)
        {
            _personCommandRepository = personCommandRepository
                ?? throw new ArgumentNullException(nameof(personCommandRepository));
            _personQueryRepository = personQueryRepository
                ?? throw new ArgumentNullException(nameof(personQueryRepository));
            _modelValidator = modelValidator ?? throw new ArgumentNullException(nameof(modelValidator));
        }

        public async Task<DeletePersonResponse> Handle(DeletePersonRequest request, CancellationToken cancellationToken)
        {
            _modelValidator.ValidateAndThrow(request);

            var person = await _personQueryRepository.GetAsync(p => p.Id == request.PersonId).ConfigureAwait(false) 
                ?? throw new Exception("Person not found!");

            var result = await _personCommandRepository.DeleteAsync(person).ConfigureAwait(false);
            await _personCommandRepository.CommitAsync().ConfigureAwait(false);

            return new DeletePersonResponse();
        }
    }
}
