using FluentValidation;
using PersonalContacts.Engine.Domain.Interfaces;

namespace PersonalContacts.Engine.Domain.Base
{
    public abstract class BaseEntityValidator<T> : AbstractValidator<T>, IEntityValidator<T>
        where T : IBaseEntity
    {
        public void ValidateEntity(T entity)
        {
            var result = this.Validate(entity);

            if (!result.IsValid) throw new Exception(result.ToString());
        }

        public void ValidateEntityProperty(T entity, string propName)
        {
            var result = this.Validate(entity, o => o.IncludeProperties(propName));

            if (!result.IsValid) throw new Exception(result.ToString());
        }
    }
}
