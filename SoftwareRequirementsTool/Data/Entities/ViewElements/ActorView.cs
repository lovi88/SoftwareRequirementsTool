using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("ActorViews")]
    public class ActorView : AbsView
    {
        [JsonConstructor]
        public ActorView(Actor element)
        {
            Element = element;
        }

        public ActorView() { }
    }
}