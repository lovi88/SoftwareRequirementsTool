using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ActorDiagramPartHub : DiagramPartHub<ActorView>
    {

        public ActorDiagramPartHub(UnitOfWork unitOfWork) : base(unitOfWork, unitOfWork.ActorViewRepository)
        {
        }

    }
}