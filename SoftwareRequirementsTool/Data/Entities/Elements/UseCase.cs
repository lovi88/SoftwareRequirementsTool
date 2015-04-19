namespace SoftwareRequirementsTool.Data.Entities.Elements
{
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
