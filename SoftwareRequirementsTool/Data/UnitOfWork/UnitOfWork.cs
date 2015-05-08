using System;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;

namespace SoftwareRequirementsTool.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly SoftwareRequirementsToolContext Context = new SoftwareRequirementsToolContext();

        private ProjectRepository _projectRepository;
        private UserStoryRepository _userStoryRepository;
        private DiagramRepository _diagramRepository;

        private DiagramPartRepository<ActorView> _actorViewRepository;
        private DiagramPartRepository<UseCaseView> _useCaseViewRepository;
        private DiagramPartRepository<ConnectionView> _connectionViewRepository;


        private ElementRepository<Actor> _actorRepository;
        private EntityRepository _entityRepository;

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


        public ElementRepository<Actor> ActorRepository
        {
            get
            {
                return _actorRepository
                    ?? (_actorRepository = new ElementRepository<Actor>(Context));
            }
        }

        public EntityRepository EntityRepository
        {
            get
            {
                return _entityRepository
                    ?? (_entityRepository = new EntityRepository(Context));
            }
        }

        public DiagramPartRepository<ActorView> ActorViewRepository
        {
            get
            {
                return _actorViewRepository
                    ?? (_actorViewRepository = new DiagramPartRepository<ActorView>(Context));
            }
        }

        public DiagramPartRepository<UseCaseView> UseCaseViewRepository
        {
            get
            {
                return _useCaseViewRepository
                    ?? (_useCaseViewRepository = new DiagramPartRepository<UseCaseView>(Context));
            }
        }

        public DiagramPartRepository<ConnectionView> ConnectionViewRepository
        {
            get
            {
                return _connectionViewRepository
                    ?? (_connectionViewRepository = new DiagramPartRepository<ConnectionView>(Context));
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