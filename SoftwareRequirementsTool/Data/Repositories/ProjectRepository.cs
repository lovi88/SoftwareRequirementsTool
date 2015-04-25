using SoftwareRequirementsTool.Data.Entities.Elements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class ProjectRepository: GenericRepository<Project>
    {
        public ProjectRepository(SoftwareRequirementsToolContext context) : base(context)
        {

        }
    }
}
