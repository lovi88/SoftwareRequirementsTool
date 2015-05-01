using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class ProjectRepository: GenericRepository<Project>
    {
        public ProjectRepository(SoftwareRequirementsToolContext context) : base(context)
        {

        }

        protected override void AssertIntegrity(Project entity) { }
        protected override void ManageForeignKeyConstraits(Project entity)
        {
            //there is no foreign key constraits for Project
        }

    }
}
