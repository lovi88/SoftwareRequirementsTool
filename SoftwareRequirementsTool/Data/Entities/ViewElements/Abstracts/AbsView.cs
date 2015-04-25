namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    public abstract class AbsView : AbsEntity, IView, IStereotiped
    {
        public Point Coordinates { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public Stereotype Stereotype { get; set; }
    }
}
