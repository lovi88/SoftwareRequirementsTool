using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Elements;
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
            if (entity.ContainerProject == null)
            {
                throw new ArgumentException("the entity must have a ContainerProject");
            }
        }


        protected override void TouchDb(TEntity entity)
        {
            AttachIfNeeded(entity.ContainerProject);
        }
    }
}
