using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ProjectHub : BaseCrudHub<Project>
    {
        public ProjectHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.ProjectRepository)
        {
            IncludeProperties = "UserStories";
        }

        public void Open(Project project)
        {
            UnitOfWork.UserStoryRepository.AddListener(project, Context.ConnectionId);
            UnitOfWork.DiagramRepository.AddListener(project, Context.ConnectionId);
        }

        public void Close(Project project)
        {
            UnitOfWork.UserStoryRepository.RemoveListener(project, Context.ConnectionId);
            UnitOfWork.DiagramRepository.RemoveListener(project, Context.ConnectionId);
        }
    }

}