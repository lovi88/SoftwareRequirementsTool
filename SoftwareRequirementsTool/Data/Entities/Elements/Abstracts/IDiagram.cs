using System.Collections.Generic;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    public interface IDiagram
    {
        List<DiagramPart> DiagramElements { get; set; }
        float AbstractionLevel { get; set; }
    }
}