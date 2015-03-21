using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TypeLite;

namespace SoftwareRequirementsTool.Data
{
    [TsClass]
    public class UseCase: AbsElement
    {
        float abstractionLevel = 1;

        public override float AbstractionLevel
        {
            get { return abstractionLevel; }
            set { abstractionLevel = value; }
        }
    }
}
