namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    public class UserStory : AbsElement
    {
        public Actor Role { get; set; }
        public string Activity { get; set; }
        public string BusinessValue { get; set; }

        float _abstractionLevel = 1;

        public Project ContainerProject { get; set; }

        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }
    }
}
