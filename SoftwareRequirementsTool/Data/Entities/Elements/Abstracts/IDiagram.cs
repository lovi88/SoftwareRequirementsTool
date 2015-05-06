using System.Collections.Generic;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.Elements.Abstracts
{
    public interface IDiagram
    {
        List<AbsDiagramPart> DiagramParts { get; set; }
        float AbstractionLevel { get; set; }
    }
}