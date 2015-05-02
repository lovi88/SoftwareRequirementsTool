using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ProjectHub : AbsOpenCloseCrudHub<Project>
    {

        public ProjectHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.ProjectRepository) { }

        public override Project Create(Project entity)
        {
            return Create(entity, DefaultAuthenticatedGroup);
        }

        public override void Modify(Project entity)
        {
            Modify(entity, DefaultAuthenticatedGroup);
        }

        public override void Delete(Project entity)
        {
            Delete(entity, DefaultAuthenticatedGroup);
        }

        protected override void BeforeCallBack(ref Project entity)
        {
            //There is no need to reload Project, it does not contains entities
        }
    }

}