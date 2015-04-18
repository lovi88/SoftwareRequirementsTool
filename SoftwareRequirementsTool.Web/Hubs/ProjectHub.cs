using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Threading;
using System.Web;
using Microsoft.AspNet.SignalR;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ProjectHub : Hub
    {
        private UnitOfWork _unitOfWork;
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

            //Clients.AllExcept(Context.ConnectionId)
            //    .created(project);

            Clients.Others.created(project);

            return project;
        }

        public void Modify(Project project)
        {
            _repository.Update(project);
            Clients.Others.modified(project);
        }

        public void Delete(Project project)
        {
            _repository.Delete(project);
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
    }

    //public class ProjectRepository : IRepository<Project>
    //{
    //    readonly MyDbContext _context = new MyDbContext();
    //    private static int _id = 0;


    //    public void Create(Project element)
    //    {
    //        element.Id = _id++;
    //        element.Name += _id;
    //        _context.Projects.Add(element);
    //    }

    //    public void Modify(Project element)
    //    {

    //    }

    //    public void Delete(Project element)
    //    {

    //    }

    //    public Project GetById(int id)
    //    {
    //        return new Project { Name = "alma_" + id, Description = "az alma egy gyümölcs", Id = id };
    //    }

    //    public IQueryable<Project> GetAll()
    //    {
    //        var pList = new List<Project>();

    //        for (int i = 1; i < 3; i++)
    //        {
    //            pList.Add(new Project { Id = i, Name = "alma " + i, Description = "alma desc " + i });
    //        }

    //        return pList.AsQueryable();
    //    }
    //}

    //interface IRepository<T>
    //{
    //    void Create(T element);
    //    void Modify(T element);
    //    void Delete(T element);
    //    T GetById(int id);
    //    IQueryable<T> GetAll();
    //}

    //public class Project
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //    public string Description { get; set; }


    //}

    //class MyDbContext
    //{
    //    public MyDbContext()
    //    {
    //        Projects = new List<Project>();
    //    }

    //    public List<Project> Projects { get; set; }

    //    public void SaveChanges()
    //    {
    //    }
    //}

}