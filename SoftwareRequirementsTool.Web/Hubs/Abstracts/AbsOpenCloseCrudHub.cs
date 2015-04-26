using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    public abstract class AbsOpenCloseCrudHub<T> : AbsCrudHub<T> where T : class, IEntity
    {
        protected AbsOpenCloseCrudHub(UnitOfWork unitOfWork, IGenericRepository<T> repository)
            : base(unitOfWork, repository)
        {
        }

        virtual public void Open(T entity)
        {
            AddCallerToGroup(GenerateGroupName(entity));
        }

        virtual public void Close(T entity)
        {
            RemoveCallerFromGroup(GenerateGroupName(entity));
        }
    }
}