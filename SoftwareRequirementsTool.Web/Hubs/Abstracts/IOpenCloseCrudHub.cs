using SoftwareRequirementsTool.Data.Entities;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    public interface IOpenCloseCrudHub<T> where T : class, IEntity
    {
        void Open(T entity);
        void Close(T entity);
    }
}