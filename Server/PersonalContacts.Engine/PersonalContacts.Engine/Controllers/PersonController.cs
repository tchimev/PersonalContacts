using MediatR;
using Microsoft.AspNetCore.Mvc;
using PersonalContacts.Engine.ApiModels;
using PersonalContacts.Engine.Handlers.Person.CreatePerson;
using PersonalContacts.Engine.Handlers.Person.DeletePerson;
using PersonalContacts.Engine.Handlers.Person.GetPersonById;
using PersonalContacts.Engine.Handlers.Person.GetPersonList;
using PersonalContacts.Engine.Handlers.Person.UpdatePerson;

namespace PersonalContacts.Engine.Api.Controllers
{
    [Route("api/persons")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PersonController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IEnumerable<PersonModel>> GetPersons()
        {
            var result = await _mediator.Send(new GetPersonListRequest());

            return result.PersonList;
        }

        [HttpGet("{id}")]
        public async Task<PersonModel> GetPersonById(int id)
        {
            var result = await _mediator.Send(new GetPersonByIdRequest() 
            { 
                PersonId = id
            });

            return result.PersonModel;
        }

        [HttpPost]
        public async Task<PersonModel> CreatePerson([FromBody] PersonModel person)
        {
            var result = await _mediator.Send(new CreatePersonRequest 
            {
                PersonModel = person
            });

            return result.PersonModel;
        }

        [HttpPut]
        public async Task<PersonModel> UpdatePerson([FromBody] PersonModel person)
        {
            var result = await _mediator.Send(new UpdatePersonRequest
            {
                PersonModel = person
            });

            return result.PersonModel;
        }

        [HttpDelete("{id}")]
        public async Task DeletePerson(int id)
        {
            await _mediator.Send(new DeletePersonRequest()
            {
                PersonId = id
            });
        }
    }
}
