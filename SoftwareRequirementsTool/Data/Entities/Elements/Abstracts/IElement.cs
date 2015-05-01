namespace SoftwareRequirementsTool.Data.Entities.Elements.Abstracts
{
    public interface IElement : IEntity, IComparableByAbstraction
    {
        string Author { get; set; }
        string Description { get; set; }
        string Name { get; set; }
        Project ContainerProject { get; set; }
        int ContainerProjectId { get; set; }
    }
}
