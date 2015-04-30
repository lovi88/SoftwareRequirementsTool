using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    public abstract class AbsContainedByProjectOpenCloseCrudHub<T> : AbsContainedByProjectCrudHub<T>, IOpenCloseCrudHub<T> where T : class, IEntity, IElement
    {

        protected AbsContainedByProjectOpenCloseCrudHub(UnitOfWork unitOfWork, IGenericRepository<T> repository) : base(unitOfWork, repository)
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