using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts
{
    [Table("AbsViews")]
    public abstract class AbsView : AbsEntity, IView, IStereotiped
    {
        public Point Coordinates { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public Stereotype Stereotype { get; set; }
        public int StereotypeId { get; set; }
    }
}
