using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SoftwareRequirementsTool.Web.Hubs
{
    public class ProjectHub : Hub
    {
        ProjectRepository repository = new ProjectRepository();

        public void Create(Project project)
        {
            repository.Create(project);
            Clients.All.created(project);
        }

        public void Modify(Project project)
        {
            repository.Modify(project);
            Clients.All.modified(project);
        }

        public void Delete(Project project)
        {
            repository.Delete(project);
            Clients.All.deleted(project);
        }

        public IEnumerable<Project> GetAll(Project project)
        {
            return repository.GetAll();
        }

    }

    public class ProjectRepository: IRepository<Project>
    {
        public void Create(Project element)
        {
            element.Id = 5;
        }

        public void Modify(Project element)
        {
            
        }

        public void Delete(Project element)
        {
            
        }

        public void GetById(int id)
        {
            
        }

        public IQueryable<Project> GetAll()
        {
            return null;
        }
    }

    interface IRepository<T>
    {
        void Create(T element);
        void Modify(T element);
        void Delete(T element);
        void GetById(int id);
        IQueryable<T> GetAll();
    }

    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


    }



}