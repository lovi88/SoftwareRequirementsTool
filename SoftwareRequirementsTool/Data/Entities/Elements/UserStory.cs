using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    [Table("UserStories")]
    public class UserStory : AbsElement
    {
        //[Required]
        public int ActorId { get; set; }

        virtual public Actor Actor { get; set; }

        public string Activity { get; set; }

        public string BusinessValue { get; set; }

        public string Complexity { get; set; }

        public string Importance { get; set; }

        private float _abstractionLevel = 1;

        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }
    }
}