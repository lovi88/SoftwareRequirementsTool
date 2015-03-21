using System;
namespace SoftwareRequirementsTool.Data
{
    public interface IElement : IComparableByAbstraction
    {
        string Author { get; set; }
        string Description { get; set; }
        int ID { get; set; }
        string Name { get; set; }
        string ShortDescription { get; set; }
    }
}
