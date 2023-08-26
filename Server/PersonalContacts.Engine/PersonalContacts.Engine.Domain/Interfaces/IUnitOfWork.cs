namespace PersonalContacts.Engine.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();

        IQueryRepository<T> Repository<T>() where T : IBaseEntity;
    }
}
