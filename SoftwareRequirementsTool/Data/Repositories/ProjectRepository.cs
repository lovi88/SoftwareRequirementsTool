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

        protected override void TouchDb(Project entity)
        {
            //there is no need to Attach Lists and Container Project is Always Null
        }


    }
}
