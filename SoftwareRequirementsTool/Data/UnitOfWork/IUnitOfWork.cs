using System;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        ProjectRepository ProjectRepository { get; }
        UserStoryRepository UserStoryRepository { get; }
        DiagramRepository DiagramRepository { get; }
        DiagramPartRepository DiagramPartRepository { get; }
        void SaveChanges();
    }
}