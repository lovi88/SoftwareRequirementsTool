using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SoftwareRequirementsTool.Data
{
    class BusinessValue: AbsElement
    {
        float abstractionLevel = 2;

        public override float AbstractionLevel
        {
            get { return abstractionLevel; }
            set { abstractionLevel = value; }
        }
    }
}
