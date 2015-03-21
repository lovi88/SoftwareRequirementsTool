using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data.Entities
{
    abstract class AbsUMLDiagramViewElement: AbsViewElement
    {
        Diagram container;

        public Diagram Container
        {
            get { return container; }
            protected set { container = value; }
        }


        public AbsUMLDiagramViewElement(Diagram containerDiagram)
        {
            container = containerDiagram;
        }

        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

    }
}
