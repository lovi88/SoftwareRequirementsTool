using System.Collections.Generic;

namespace SoftwareRequirementsTool.Data.Entities
{
    public class Project : AbsElement
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
