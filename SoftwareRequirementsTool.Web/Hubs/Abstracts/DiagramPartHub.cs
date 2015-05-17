using System.Collections.Generic;
using System.Linq;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;
using SoftwareRequirementsTool.Data.UnitOfWork;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    abstract public class DiagramPartHub<TPart> : AbsCrudHub<TPart> where TPart : class, IEntity, IDiagramPart
    {
        protected DiagramPartHub(UnitOfWork unitOfWork, IGenericRepository<TPart> repository)
            : base(unitOfWork, repository)
        {
        }

        public override TPart Create(TPart entity)
        {
            return Create(entity, GenerateGroupName(entity.Diagram));
        }

        public override void Modify(TPart entity)
        {
            Modify(entity, GenerateGroupName(entity.Diagram));
            //ModifyBroadcast(entity, GenerateGroupName(entity.Diagram));

        }

        public override void Refresh(TPart entity)
        {
            Refresh(entity, GenerateGroupName(entity.Diagram));
        }

        public override bool Delete(TPart entity)
        {
            return Delete(entity, GenerateGroupName(entity.Diagram));
        }

        protected override void BeforeCallBack(ref TPart entity)
        {
            entity = Repository.GetById(entity.Id, "Diagram,ContainerProject");
            entity.Element = UnitOfWork.EntityRepository.GetById(entity.ElementId) as AbsElement;
        }

        virtual public IEnumerable<TPart> GetAllFor(Diagram diagram)
        {
            if (diagram == null)
            {
                SendError("Diagram can not be empty");
                return new List<TPart>();
            }

            var allFor = Repository
                .Get(part => part.DiagramId == diagram.Id).ToList();

            foreach (var part in allFor)
            {
                part.Element = UnitOfWork.EntityRepository.GetById(part.ElementId) as AbsElement;
            }

            return allFor;
        }
    }
}