using System.Collections.Generic;
using System.Linq;
using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;
using SoftwareRequirementsTool.Data.UnitOfWork;

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
            if (project == null)
            {
                SendError("Project was null");
                return new List<T>();
            }

            return Repository.Get(diagram => diagram.ContainerProject.Id == project.Id).ToList();
        }

        protected override void BeforeCallBack(ref T entity)
        {
            if (entity.ContainerProject == null)
            {
                entity.ContainerProject = UnitOfWork.ProjectRepository
                    .GetById(entity.ContainerProjectId);
            }
        }
    }
}