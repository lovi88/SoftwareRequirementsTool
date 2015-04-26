using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    public class DiagramPart: AbsEntity
    {
        public IElement Element { get; set; }

        [JsonIgnore]
        virtual public Diagram Diagram { get; set; }
        public IView View { get; set; }
    }


}
