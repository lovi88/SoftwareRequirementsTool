using System;
using SoftwareRequirementsTool.Data.Entities;

namespace SoftwareRequirementsTool.Data
{
    public interface IElement : IEntity, IComparableByAbstraction
    {
        string Author { get; set; }
        string Description { get; set; }
        string Name { get; set; }
        string ShortDescription { get; set; }
        string TypeName { get; }
    }
}
