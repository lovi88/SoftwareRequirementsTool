using SoftwareRequirementsTool.Data.EFContext;
using SoftwareRequirementsTool.Data.Entities.Elements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class UserStoryRepository: ElementRepository<UserStory>
    {
        public UserStoryRepository(SoftwareRequirementsToolContext context) : base(context)
        {
        }


        protected override void ManageForeignKeyConstraits(UserStory entity)
        {
            entity.ActorId = ForeignKeyHelper(entity.Actor, entity.ActorId);
            entity.Actor = null;

            base.ManageForeignKeyConstraits(entity);
        }
    }
}
