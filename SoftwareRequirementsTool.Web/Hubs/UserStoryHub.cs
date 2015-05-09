using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class UserStoryHub : AbsContainedByProjectCrudHub<UserStory>
    {
        public UserStoryHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.UserStoryRepository)
        {
        }

        protected override void BeforeCallBack(ref UserStory entity)
        {
            entity.Actor = UnitOfWork.ActorRepository.GetById(entity.ActorId);

            base.BeforeCallBack(ref entity);
        }
    }
}