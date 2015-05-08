using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts
{
    [Table("AbsViews")]
    public abstract class AbsView : AbsDiagramPart, IView
    {
        public float X { get; set; }
        public float Y { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }

    }
}
