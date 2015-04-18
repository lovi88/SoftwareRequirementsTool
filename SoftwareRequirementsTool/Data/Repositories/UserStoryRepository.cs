using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class UserStoryRepository: GenericRepository<UserStory>
    {
        public UserStoryRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }
    }
}
