using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.UnitOfWork
{
    public interface IUnitOfWork
    {
        ProjectRepository ProjectRepository { get; }
        UserStoryRepository UserStoryRepository { get; }
        DiagramRepository DiagramRepository { get; }
        ElementRepository<Actor> ActorRepository { get; }
        EntityRepository EntityRepository { get; }
        DiagramPartRepository<ActorView> ActorViewRepository { get; }
        DiagramPartRepository<UseCaseView> UseCaseViewRepository { get; }
        DiagramPartRepository<ConnectionView> ConnectionViewRepository { get; }
        void SaveChanges();
    }
}