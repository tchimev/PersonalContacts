namespace PersonalContacts.Engine.Domain.Interfaces
{
    public interface IEntityValidator<T> where T : IBaseEntity 
    {
        void ValidateEntity(T entity);
        void ValidateEntityProperty(T entity, string propName);
    }
}
