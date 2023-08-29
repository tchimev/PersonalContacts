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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetPersons()
        {
            var result = await _mediator.Send(new GetPersonListRequest());

            return Ok(result.PersonList);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPersonById(int id)
        {
            var result = await _mediator.Send(new GetPersonByIdRequest() 
            { 
                PersonId = id
            });

            return Ok(result.PersonModel);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreatePerson([FromBody] PersonModel person)
        {
            var result = await _mediator.Send(new CreatePersonRequest 
            {
                PersonModel = person
            });

            return Ok(result.PersonModel);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdatePerson([FromBody] PersonModel person)
        {
            var result = await _mediator.Send(new UpdatePersonRequest
            {
                PersonModel = person
            });

            return Ok(result.PersonModel);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeletePerson(int id)
        {
            await _mediator.Send(new DeletePersonRequest()
            {
                PersonId = id
            });

            return NoContent();
        }
    }
}
