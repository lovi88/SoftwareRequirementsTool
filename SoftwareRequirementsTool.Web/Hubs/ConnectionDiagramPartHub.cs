using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ConnectionDiagramPartHub : DiagramPartHub<ConnectionView>
    {

        public ConnectionDiagramPartHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.ConnectionViewRepository)
        {
        }

    }
}