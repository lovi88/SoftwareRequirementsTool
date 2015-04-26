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
            base.TouchDb(entity);

            AttachIfNeeded(entity.Role);
        }
    }
}
