using System.Linq.Expressions;

namespace PersonalContacts.Engine.Domain.Interfaces
{
    public interface IRepository<T> where T : IBaseEntity
    {
        Task<T> AddAsync(T entity);

        Task<T> UpdateAsync(T entity);

        Task<bool> DeleteAsync(T entity);

        Task<T> GetAsync(Expression<Func<T, bool>> expression);

        Task<List<T>> ListAsync(Expression<Func<T, bool>> expression);
    }
}
