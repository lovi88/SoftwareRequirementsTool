using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities.Elements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class UserStoryRepository: SignalRObservableRepository<UserStory>
    {
        public UserStoryRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

    }
}
