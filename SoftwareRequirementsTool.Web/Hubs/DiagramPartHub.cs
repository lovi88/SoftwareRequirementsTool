using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class DiagramPartHub : AbsCrudHub<DiagramPart>
    {
        public DiagramPartHub(UnitOfWork unitOfWork, IGenericRepository<DiagramPart> repository)
            : base(unitOfWork, unitOfWork.DiagramPartRepository)
        {
        }

        public override DiagramPart Create(DiagramPart entity)
        {
            return Create(entity, GenerateGroupName(entity.Diagram));
        }

        public override void Modify(DiagramPart entity)
        {
            Modify(entity, GenerateGroupName(entity.Diagram));
        }

        public override void Delete(DiagramPart entity)
        {
            Delete(entity, GenerateGroupName(entity.Diagram));
        }
    }
}