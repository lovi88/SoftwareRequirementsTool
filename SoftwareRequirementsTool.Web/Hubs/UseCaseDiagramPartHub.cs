using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class UseCaseDiagramPartHub : DiagramPartHub<UseCaseView>
    {

        public UseCaseDiagramPartHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.UseCaseViewRepository)
        {
        }

    }
}