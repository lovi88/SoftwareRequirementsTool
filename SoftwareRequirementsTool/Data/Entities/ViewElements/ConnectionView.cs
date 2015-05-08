using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Connections;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("ConnectionViews")]
    public class ConnectionView : AbsDiagramPart
    {
         [JsonConstructor]
        public ConnectionView(Connection element)
        {
            Element = element;
        }

        public ConnectionView() { }
    }
}