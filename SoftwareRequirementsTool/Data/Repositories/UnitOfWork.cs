using System;

namespace SoftwareRequirementsTool.Data.Repositories
{
    public class UnitOfWork : IDisposable
    {
        protected readonly SoftwareRequirementsToolContext Context = new SoftwareRequirementsToolContext();
        private ProjectRepository _projectRepository;
        private UserStoryRepository _userStoryRepository;

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

        public void Save()
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