using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("DiagramParts")]
    public class DiagramPart : AbsElement
    {
        public int ElementId { get; set; }

        [ForeignKey("ElementId")]
        public AbsElement Element { get; set; }

        public int ViewId { get; set; }

        [ForeignKey("ViewId")]
        public AbsView View { get; set; }

        [JsonIgnore]
        virtual public Diagram Diagram { get; set; }
        public int DiagramId { get; set; }

        public override float AbstractionLevel { get; set; }
    }


}
