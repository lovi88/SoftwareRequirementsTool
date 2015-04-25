namespace SoftwareRequirementsTool.Data.Entities
{
    public interface IEntity
    {
        int Id { get; set; }
        string TypeName { get; }
    }

}
