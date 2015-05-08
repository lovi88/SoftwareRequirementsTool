using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("UseCaseViews")]
    public class UseCaseView : AbsView
    {
        public float Cx { get; set; }
        public float Cy { get; set; }
        public float Rx { get; set; }
        public float Ry { get; set; }

        [JsonConstructor]
        public UseCaseView(UseCase element)
        {
            Element = element;
        }

        public UseCaseView() { }
    }
}