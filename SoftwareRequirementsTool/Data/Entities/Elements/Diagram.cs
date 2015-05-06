using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    [Table("Diagrams")]
    public class Diagram: AbsElement, IDiagram
    {
        virtual public List<AbsDiagramPart> DiagramParts { get; set; }

        float _abstractionLevel = 0.5f;
        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }

    }
}
