using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ProjectHub : Hub
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly ProjectRepository _repository;

        public ProjectHub() : this(new UnitOfWork()) { }

        public ProjectHub(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repository = _unitOfWork.ProjectRepository;
        }

        public Project Create(Project project)
        {
            _repository.Insert(project);
            _unitOfWork.SaveChanges();

            Clients.Others.created(project);

            return project;
        }

        public void Modify(Project project)
        {
            _repository.Update(project);
            _unitOfWork.SaveChanges();

            Clients.Others.modified(project);
        }

        public void Delete(Project project)
        {
            _repository.Delete(project);
            _unitOfWork.SaveChanges();

            Clients.Others.deleted(project);
        }

        public IEnumerable<Project> GetAll()
        {
            return _repository.Get().ToList();
        }

        public Project GetById(int id)
        {
            return _repository.GetById(id);
        }

        public void Open(Project project)
        {
            _unitOfWork.UserStoryRepository.AddListener(project, Context.ConnectionId);
            _unitOfWork.DiagramRepository.AddListener(project, Context.ConnectionId);
        }

        public void Close(Project project)
        {
            _unitOfWork.UserStoryRepository.RemoveListener(project, Context.ConnectionId);
            _unitOfWork.DiagramRepository.RemoveListener(project, Context.ConnectionId);
        }
    }

}