using System.Linq.Expressions;

namespace PersonalContacts.Engine.Domain.Interfaces
{
    public interface IQueryRepository<T> where T : IBaseEntity
    {
        Task<T> GetAsync(Expression<Func<T, bool>> expression);

        Task<List<T>> ListAsync(Expression<Func<T, bool>> expression);
    }
}
