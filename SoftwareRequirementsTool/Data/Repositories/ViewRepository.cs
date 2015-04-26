using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    class ViewRepository: GenericRepository<AbsView>
    {
        public ViewRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void AssertIntegrity(AbsView entity)
        {
            if (entity.Coordinates == null)
            {
                throw new ArgumentException("AbsView must have Coordinates");
            }
        }

        protected override void TouchDb(AbsView entity)
        {
            if (IsAttachNeeded(entity.Coordinates))
            {
                new EntityRepository(Context).Attach(entity.Coordinates);
            }
        }
    }
}
