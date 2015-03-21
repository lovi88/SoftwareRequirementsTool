using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    class UseCaseViewElement: AbsUMLDiagramViewElement
    {
        float _abstractionLevel = 1;

        public UseCaseViewElement(Diagram containerDiagram): base(containerDiagram)
        {

        }


        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }
    }
}
