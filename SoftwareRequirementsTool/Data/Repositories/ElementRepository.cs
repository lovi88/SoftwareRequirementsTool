using System;
using SoftwareRequirementsTool.Data.EFContext;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class ElementRepository<TEntity> : GenericRepository<TEntity> where TEntity : class, IEntity, IElement
    {
        public ElementRepository(SoftwareRequirementsToolContext context) : base(context)
        {

        }

        protected override void AssertIntegrity(TEntity entity)
        {
            if (entity.ContainerProject == null && entity.ContainerProjectId == 0)
            {
                throw new ArgumentException("the entity must have a ContainerProject");
            }
        }

        protected override void ManageForeignKeyConstraits(TEntity entity)
        {
            entity.ContainerProjectId = ForeignKeyHelper(entity.ContainerProject, entity.ContainerProjectId);
            entity.ContainerProject = null;
        }
    }
}
