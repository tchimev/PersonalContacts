using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PersonalContacts.Engine.Data;
using PersonalContacts.Engine.Data.Repositories.Command;
using PersonalContacts.Engine.Data.Repositories.Query;
using PersonalContacts.Engine.Domain.Entities.Person;
using PersonalContacts.Engine.Handlers.Person.CreatePerson;
using PersonalContacts.Engine.Handlers.Person.DeletePerson;
using PersonalContacts.Engine.Handlers.Person.GetPersonById;
using PersonalContacts.Engine.Handlers.Person.UpdatePerson;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<EFContext>(options =>
  options.UseSqlite(builder.Configuration.GetConnectionString("PersonalContacts")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(msc => msc.RegisterServicesFromAssemblyContaining<ICreatePersonValidator>());
builder.Services.AddScoped<ICreatePersonValidator, CreatePersonValidator>();
builder.Services.AddScoped<IDeletePersonValidator, DeletePersonValidator>();
builder.Services.AddScoped<IUpdatePersonValidator, UpdatePersonValidator>();
builder.Services.AddScoped<IGetPersonByIdValidator, GetPersonByIdValidator>();
builder.Services.AddScoped<IPersonValidator, PersonValidator>();
builder.Services.AddScoped<IPersonCommandRepository, PersonCommandRepository>();
builder.Services.AddScoped<IPersonQueryRepository, PersonQueryRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder.AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
