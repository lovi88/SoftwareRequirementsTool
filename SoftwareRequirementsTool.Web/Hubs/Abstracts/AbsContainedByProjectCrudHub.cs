using System.Collections.Generic;
using System.Linq;
using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    public abstract class AbsContainedByProjectCrudHub<T> : AbsCrudHub<T> where T : class, IEntity, IElement
    {
        #region CRUD overrides
        public override T Create(T entity)
        {
            return Create(entity, GenerateGroupName(entity.ContainerProject));
        }

        public override void Modify(T entity)
        {
            Modify(entity, GenerateGroupName(entity.ContainerProject));
        }

        public override void Delete(T entity)
        {
            Delete(entity, GenerateGroupName(entity.ContainerProject));
        }

        #endregion

        protected AbsContainedByProjectCrudHub(UnitOfWork unitOfWork, IGenericRepository<T> repository) : base(unitOfWork, repository)
        {
        }

        virtual public IEnumerable<T> GetAllFor(Project project)
        {
            return Repository.Get(diagram => diagram.ContainerProject.Id == project.Id).ToList();
        }
    }
}