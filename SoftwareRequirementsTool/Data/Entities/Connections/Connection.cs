using System.ComponentModel.DataAnnotations.Schema;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Entities.Connections
{
    [Table("Connections")]
    public class Connection : AbsElement 
    {
        public AbsEntity From { get; set; }
        public AbsEntity To { get; set; }
        public AbsEntity Scope { get; set; }
        public Stereotype Stereotype { get; set; }

        public ConnectionType ConnectionType { get; set; }


        public override float AbstractionLevel
        {
            get { return 0; }
            set {  }
        }
    }

    public enum ConnectionType
    {
        Association,
        DirectedAssociation,

        Aggregation,
        Composition,

        Inheritence,
        InterfaceImplementation,

        Dependency
    }
}
