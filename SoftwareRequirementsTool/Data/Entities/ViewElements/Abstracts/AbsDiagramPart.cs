using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts
{
    [Table("DiagramParts")]
    abstract public class AbsDiagramPart : AbsElement
    {
        public int ElementId { get; set; }

        [ForeignKey("ElementId")]
        public AbsElement Element { get; set; }

        [JsonIgnore]
        virtual public Diagram Diagram { get; set; }
        public int DiagramId { get; set; }

        public override float AbstractionLevel { get; set; }
    }


}
