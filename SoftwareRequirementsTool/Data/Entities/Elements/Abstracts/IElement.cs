using System.Collections.Generic;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    public interface IElement : IEntity, IComparableByAbstraction
    {
        string Author { get; set; }
        string Description { get; set; }
        string Name { get; set; }
    }
}
