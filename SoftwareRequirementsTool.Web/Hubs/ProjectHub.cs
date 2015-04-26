using System;
using System.Web.Http.ModelBinding;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ProjectHub : AbsOpenCloseCrudHub<Project>
    {


        public ProjectHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.ProjectRepository)
        {
            //IncludeProperties = "UserStories";
        }

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
    }

}