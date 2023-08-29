using FluentValidation;

namespace PersonalContacts.Engine.Handlers.Person.GetPersonList
{
    public class GetPersonListValidator : AbstractValidator<GetPersonListRequest>, IGetPersonListValidator
    {
        public GetPersonListValidator() 
        {
        }
    }

    public interface IGetPersonListValidator : IValidator<GetPersonListRequest> { }
}
