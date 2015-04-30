using SoftwareRequirementsTool.Data.Entities.Elements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class UserStoryRepository: ElementRepository<UserStory>
    {
        public UserStoryRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }

        protected override void TouchDb(UserStory entity)
        {
            AttachOrCreateIfNeeded(entity.Actor);
            entity.ActorId = entity.Actor.Id;
            base.TouchDb(entity);
        }
    }
}
