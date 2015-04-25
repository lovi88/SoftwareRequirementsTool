using System.Collections.Generic;
using System.Linq;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class DiagramHub : BaseCrudHub<Diagram>
    {
        public DiagramHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.DiagramRepository)
        {
        }

        public void Open(Diagram diagram)
        {
            UnitOfWork.DiagramPartRepository.AddListener(diagram, Context.ConnectionId);
        }

        public void Close(Diagram diagram)
        {
            UnitOfWork.DiagramPartRepository.RemoveListener(diagram, Context.ConnectionId);
        }

        #region CRUD overrides
        public override Diagram Create(Diagram entity)
        {
            TouchDb(entity);
            return base.Create(entity);
        }

        public override void Modify(Diagram entity)
        {
            TouchDb(entity);
            base.Modify(entity);
        }


        #endregion

        public IEnumerable<Diagram> GetAllFor(Project project)
        {
            var r = Repository.Get(diagram => diagram.ContainerProject.Id == project.Id).ToList();


            return r;
        }

        #region Helpers

        void TouchDb(Diagram diagram)
        {
            diagram.ContainerProject = UnitOfWork.ProjectRepository.GetById(diagram.ContainerProject.Id);
        }

        #endregion
    }
}