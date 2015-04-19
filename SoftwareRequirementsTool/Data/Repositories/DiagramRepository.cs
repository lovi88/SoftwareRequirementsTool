using SoftwareRequirementsTool.Data.Entities.Elements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class DiagramRepository: SignalRObservableRepository<Diagram>
    {
        public DiagramRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }
    }
}
