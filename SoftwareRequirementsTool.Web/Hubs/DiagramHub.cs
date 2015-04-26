using System.Collections.Generic;
using System.Linq;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Web.Hubs.Abstracts;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class DiagramHub : AbsOpenCloseCrudHub<Diagram>
    {
        public DiagramHub(UnitOfWork unitOfWork)
            : base(unitOfWork, unitOfWork.DiagramRepository)
        {
        }


        #region CRUD overrides
        public override Diagram Create(Diagram entity)
        {
            return Create(entity, GenerateGroupName(entity.ContainerProject));
        }

        public override void Modify(Diagram entity)
        {
            Modify(entity, GenerateGroupName(entity.ContainerProject));
        }

        public override void Delete(Diagram entity)
        {
            Delete(entity, GenerateGroupName(entity.ContainerProject));
        }

        #endregion
        

        public IEnumerable<Diagram> GetAllFor(Project project)
        {
            var r = Repository.Get(diagram => diagram.ContainerProject.Id == project.Id).ToList();

            return r;
        }

    }
}