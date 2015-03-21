using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SoftwareRequirementsTool.Utilities
{
    public delegate void GenericEntityEventHandler<TEventContent>(Object sender, GenericEventArgs<TEventContent> e);

    public interface IGenericCRUD<T,Tid>
    {
        IQueryable<T> List { get; }
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
        T GetById(Tid Id);

        event GenericEntityEventHandler<T> ElementAdded;
        event GenericEntityEventHandler<T> ElementDeleted;
        event GenericEntityEventHandler<T> ElementUpdated;
    }
}
