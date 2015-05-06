using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class DiagramPartHub : AbsCrudHub<AbsDiagramPart>
    {
        public DiagramPartHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.DiagramPartRepository)
        {
        }

        public override AbsDiagramPart Create(AbsDiagramPart entity)
        {
            return Create(entity, GenerateGroupName(entity.Diagram));
        }

        public override void Modify(AbsDiagramPart entity)
        {
            Modify(entity, GenerateGroupName(entity.Diagram));
        }

        public override void Delete(AbsDiagramPart entity)
        {
            Delete(entity, GenerateGroupName(entity.Diagram));
        }

        protected override void BeforeCallBack(ref AbsDiagramPart entity)
        {
            entity = UnitOfWork.DiagramPartRepository.GetById(entity.Id, "Diagram,Element,ContainerProject");
        }
    }
}