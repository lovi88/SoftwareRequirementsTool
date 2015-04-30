using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("DiagramParts")]
    public class DiagramPart: AbsEntity
    {
        public AbsElement Element { get; set; }

        public AbsView View { get; set; }
        
        [JsonIgnore]
        virtual public Diagram Diagram { get; set; }
        public int DiagramId { get; set; }
    }


}
