using System;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Repositories.Abstracts
{
    public class DiagramPartRepository <TPart>:
        ElementRepository<TPart> where TPart : class, IElement, IDiagramPart
    {
        public DiagramPartRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void AssertIntegrity(TPart entity)
        {
            if (entity.Diagram == null || entity.Element == null)
            {
                throw new ArgumentException("DiagramPart must contain an Element and containd by a Diagram");
            }
        }

        protected override void ManageForeignKeyConstraits(TPart entity)
        {
            entity.ElementId = ForeignKeyHelper(entity.Element, entity.ElementId);
            entity.Element = null;

            entity.DiagramId = ForeignKeyHelper(entity.Diagram, entity.DiagramId);
            entity.Diagram = null;

            base.ManageForeignKeyConstraits(entity);
        }

    }
}
