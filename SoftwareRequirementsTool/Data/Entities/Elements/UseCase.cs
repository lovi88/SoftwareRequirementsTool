using System.ComponentModel.DataAnnotations.Schema;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    [Table("UseCases")]
    public class UseCase: AbsElement
    {

        float _abstractionLevel = 1;
        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }
    }
}
