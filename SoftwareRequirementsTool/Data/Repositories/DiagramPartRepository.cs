using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class DiagramPartRepository:
        ElementRepository<DiagramPart>
    {
        public DiagramPartRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void AssertIntegrity(DiagramPart entity)
        {
            if (entity.Diagram == null || entity.Element == null || entity.View == null)
            {
                throw new ArgumentException("DiagramPart must contain a View and an Element and containd by a Diagram");
            }
        }

        protected override void ManageForeignKeyConstraits(DiagramPart entity)
        {
            entity.ViewId = ForeignKeyHelper(entity.View, entity.ViewId);
            entity.View = null;

            entity.ElementId = ForeignKeyHelper(entity.Element, entity.ElementId);
            entity.Element = null;

            base.ManageForeignKeyConstraits(entity);
        }

    }
}
