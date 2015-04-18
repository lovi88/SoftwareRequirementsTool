using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data
{
    public class Diagram: AbsElement
    {
        float abstractionLevel = 0.5f;

        public override float AbstractionLevel
        {
            get { return abstractionLevel; }
            set { abstractionLevel = value; }
        }
    }
}
