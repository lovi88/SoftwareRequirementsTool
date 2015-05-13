using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class DiagramHub : AbsContainedByProjectOpenCloseCrudHub<Diagram>
    {
        public DiagramHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.DiagramRepository) { }

    }
}