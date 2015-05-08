using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts
{
    public interface IDiagramPart
    {
        IElement Element { get; set; }
        int ElementId { get; set; }
        Diagram Diagram { get; set; }
        int DiagramId { get; set; }
    }
}