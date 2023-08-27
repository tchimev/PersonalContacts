using Microsoft.EntityFrameworkCore;
using PersonalContacts.Engine.Domain.Base;
using PersonalContacts.Engine.Domain.Interfaces;

namespace PersonalContacts.Engine.Data.Repositories.Command.Base
{
    public class BaseCommandRepository<T> : ICommandRepository<T> where T : BaseEntity<int>
    {
        private readonly DbSet<T> _dbSet;
        private readonly EFContext _context;

        public BaseCommandRepository(EFContext dbContext)
        {
            _context = dbContext;
            _dbSet = dbContext.Set<T>();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public Task<bool> DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            return Task.FromResult(true);
        }

        public Task<T> UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            return Task.FromResult(entity);
        }
    }
}
