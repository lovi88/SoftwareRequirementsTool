using System;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly SoftwareRequirementsToolContext Context = new SoftwareRequirementsToolContext();

        private ProjectRepository _projectRepository;
        private UserStoryRepository _userStoryRepository;
        private DiagramRepository _diagramRepository;
        private SignalRObservableRepository<DiagramPart> _diagramPartRepository;

        public ProjectRepository ProjectRepository
        {
            get
            {
                return _projectRepository 
                    ?? (_projectRepository = new ProjectRepository(Context));
            }
        }

        public UserStoryRepository UserStoryRepository
        {
            get 
            { 
                return _userStoryRepository 
                    ?? (_userStoryRepository = new UserStoryRepository(Context)); 
            }
        }

        public DiagramRepository DiagramRepository
        {
            get 
            { 
                return _diagramRepository
                    ?? (_diagramRepository = new DiagramRepository(Context));
            }
        }

        public SignalRObservableRepository<DiagramPart> DiagramPartRepository
        {
            get
            {
                return _diagramPartRepository
                    ?? (_diagramPartRepository = new SignalRObservableRepository<DiagramPart>(Context));
            }
        }


        public void SaveChanges()
        {
            Context.SaveChanges();
        }

        private bool _disposed;

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    Context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}