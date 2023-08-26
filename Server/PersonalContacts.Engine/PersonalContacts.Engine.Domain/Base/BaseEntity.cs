using PersonalContacts.Engine.Domain.Interfaces;

namespace PersonalContacts.Engine.Domain.Base
{
    public abstract class BaseEntity<TKey> : IBaseEntity
    {
        public TKey Id { get; internal set; }
    }
}
