using System;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class DiagramRepository: ElementRepository<Diagram>
    {
        public DiagramRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void AssertIntegrity(Diagram entity) {
            if (String.IsNullOrEmpty(entity.Name))
            {
                throw new ArgumentException("Diagram has to have a Name");
            }
        }

    }
}
