using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ActorHub : AbsContainedByProjectCrudHub<Actor>
    {
        public ActorHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.ActorRepository)
        {

        }

    }
}