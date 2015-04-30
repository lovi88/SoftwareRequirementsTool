using System.Collections.Generic;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Entities.Elements.Abstracts
{
    public interface IDiagram
    {
        List<DiagramPart> DiagramParts { get; set; }
        float AbstractionLevel { get; set; }
    }
}