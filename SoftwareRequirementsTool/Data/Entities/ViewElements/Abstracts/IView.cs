namespace SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts
{
    public interface IView: IEntity
    {
        float X { get; set; }
        float Y { get; set; }
        int Width { get; set; }
        int Height { get; set; }
    }
}
