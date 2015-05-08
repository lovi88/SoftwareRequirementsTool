using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts
{
    [Table("AbsDiagramParts")]
    public abstract class AbsDiagramPart : AbsElement, IDiagramPart
    {
        [ForeignKey("ElementId")]
        virtual public IElement Element { get; set; }
        public int ElementId { get; set; }

        virtual public Diagram Diagram { get; set; }
        public int DiagramId { get; set; }

        public override float AbstractionLevel
        {
            get
            {
                return Element != null ? Element.AbstractionLevel : 0;
            }
            set
            {
                if (Element != null)
                {
                    Element.AbstractionLevel = value;
                }
            }
        }
    }
}