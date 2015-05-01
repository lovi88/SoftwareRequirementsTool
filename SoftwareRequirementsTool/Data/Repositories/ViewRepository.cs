using System;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;
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

        protected override void ManageForeignKeyConstraits(AbsView entity)
        {
            entity.CoordinatesId = ForeignKeyHelper(entity.Coordinates, entity.CoordinatesId);
            entity.Coordinates = null;
        }

    }
}
