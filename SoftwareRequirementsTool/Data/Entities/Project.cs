using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data
{
    class Project : AbsElement
    {
        public override float AbstractionLevel
        {
            get
            {
                return 0;
            }
            set { }
        }


        public List<Diagram> Diagrams { get; set; }
    }
}
