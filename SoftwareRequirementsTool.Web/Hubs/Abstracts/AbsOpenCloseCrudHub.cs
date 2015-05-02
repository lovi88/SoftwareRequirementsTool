using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;
using SoftwareRequirementsTool.Data.UnitOfWork;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    public abstract class AbsOpenCloseCrudHub<T> : AbsCrudHub<T>, IOpenCloseCrudHub<T> where T : class, IEntity
    {
        protected AbsOpenCloseCrudHub(UnitOfWork unitOfWork, IGenericRepository<T> repository)
            : base(unitOfWork, repository)
        {
        }

        public void Open(T entity)
        {
            AddCallerToGroup(GenerateGroupName(entity));
        }

        public void Close(T entity)
        {
            RemoveCallerFromGroup(GenerateGroupName(entity));
        }
    }
}