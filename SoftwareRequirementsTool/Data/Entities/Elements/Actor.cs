using System.ComponentModel.DataAnnotations.Schema;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    [Table("Actors")]
    public class Actor: AbsElement
    {
        float _abstractionLevel = 0.5f;
        
        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }
    }
}
