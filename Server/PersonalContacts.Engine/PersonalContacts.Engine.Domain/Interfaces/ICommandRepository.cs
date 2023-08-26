using System.Linq.Expressions;

namespace PersonalContacts.Engine.Domain.Interfaces
{
    public interface ICommandRepository<T> where T : IBaseEntity
    {
        Task<T> AddAsync(T entity);

        Task<T> UpdateAsync(T entity);

        Task<bool> DeleteAsync(T entity);
    }
}
