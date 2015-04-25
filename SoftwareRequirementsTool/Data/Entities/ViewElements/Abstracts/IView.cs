namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    public interface IView: IEntity
    {
        Point Coordinates { get; set; }
        int Width { get; set; }
        int Height { get; set; }
    }
}
