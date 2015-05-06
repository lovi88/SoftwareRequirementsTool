using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class DiagramPartRepository:
        ElementRepository<AbsDiagramPart>
    {
        public DiagramPartRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void AssertIntegrity(AbsDiagramPart entity)
        {
            if (entity.Diagram == null || entity.Element == null)
            {
                throw new ArgumentException("AbsDiagramPart must contain a View and an Element and containd by a Diagram");
            }
        }

        protected override void ManageForeignKeyConstraits(AbsDiagramPart entity)
        {
            entity.ElementId = ForeignKeyHelper(entity.Element, entity.ElementId);
            entity.Element = null;

            base.ManageForeignKeyConstraits(entity);
        }

    }
}
