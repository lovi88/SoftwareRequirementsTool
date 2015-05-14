using SoftwareRequirementsTool.Data.EFContext;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Abstracts;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class EntityRepository: GenericRepository<AbsEntity>
    {
        public EntityRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void AssertIntegrity(AbsEntity entity) { }
        protected override void ManageForeignKeyConstraits(AbsEntity entity)
        {
            //there is no foreign key constraint for Entities
        }
    }
}
