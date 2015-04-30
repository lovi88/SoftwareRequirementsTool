using System.ComponentModel.DataAnnotations.Schema;
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

    }
}