namespace PersonalContacts.Engine.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> SaveChangesAsync();

        IRepository<T> Repository<T>() where T : IBaseEntity;
    }
}
