using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data
{
    class Actor: AbsElement
    {
        float abstractionLevel = 1;

        public override float AbstractionLevel
        {
            get { return abstractionLevel; }
            set { abstractionLevel = value; }
        }
    }
}
