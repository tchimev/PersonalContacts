using Microsoft.EntityFrameworkCore;
using PersonalContacts.Engine.Domain.Base;
using PersonalContacts.Engine.Domain.Interfaces;
using System.Linq.Expressions;

namespace PersonalContacts.Engine.Data.Repositories.Query.Base
{
    public class BaseCommandRepository<T> : IQueryRepository<T> where T : BaseEntity<int>
    {
        private readonly DbSet<T> _dbSet;

        public BaseCommandRepository(EFContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
        }

        public Task<T> GetAsync(Expression<Func<T, bool>> expression)
        {
            return _dbSet.FirstOrDefaultAsync(expression);
        }

        public Task<List<T>> ListAsync(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Where(expression).ToListAsync();
        }
    }
}
