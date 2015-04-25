using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class DiagramPartHub : BaseCrudHub<DiagramPart>
    {
        public DiagramPartHub(UnitOfWork unitOfWork, IGenericRepository<DiagramPart> repository)
            : base(unitOfWork, unitOfWork.DiagramPartRepository)
        {
        }
    }
}