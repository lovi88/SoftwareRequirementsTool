using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;
using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
    public enum GroupNames
    {
        
    }

    public abstract class AbsCrudHub<T> : Hub
        where T : class, IEntity
    {
        protected const string DefaultAuthenticatedGroup = "AllAuthenticatedUser";

        protected readonly UnitOfWork UnitOfWork;
        protected readonly IGenericRepository<T> Repository;
        protected string IncludeProperties { get; set; }

        protected AbsCrudHub(UnitOfWork unitOfWork, IGenericRepository<T> repository)
        {
            UnitOfWork = unitOfWork;
            Repository = repository;
        }

        virtual protected T Create(T entity, string groupName)
        {
            Repository.Insert(entity);
            UnitOfWork.SaveChanges();

            Clients.Group(groupName, Context.ConnectionId).created(entity);

            return entity;
        }

        abstract public T Create(T entity);

        virtual protected void Modify(T entity, string groupName)
        {
            Repository.Update(entity);
            UnitOfWork.SaveChanges();

            Clients.OthersInGroup(groupName).modified(entity);
        }

        public abstract void Modify(T entity);

        virtual public void Delete(T entity, string groupName)
        {
            Repository.Delete(entity);
            UnitOfWork.SaveChanges();

            Clients.Group(groupName, Context.ConnectionId).deleted(entity);
        }

        public abstract void Delete(T entity);

        virtual public IEnumerable<T> GetAll()
        {
            return String.IsNullOrEmpty(IncludeProperties)
                ? Repository.Get().ToList()
                : Repository.Get(includeProperties: IncludeProperties).ToList();
        }

        virtual public T GetById(int id)
        {
            return Repository.GetById(id);
        }

        virtual protected string GenerateGroupName(IEntity entity)
        {
            return entity.TypeName + "_" + entity.Id;
        }

        virtual protected void AddCallerToGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        virtual protected void RemoveCallerFromGroup(string groupName)
        {
            Groups.Remove(Context.ConnectionId, groupName);
        }
    }
}