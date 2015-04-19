using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities;
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
