using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;
using SoftwareRequirementsTool.Data;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Utilities.ErrorMessages;

namespace SoftwareRequirementsTool.Web.Hubs.Abstracts
{
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
            TrySave(entity);

            Clients.OthersInGroup(groupName).created(entity);
            return entity;
        }

        abstract public T Create(T entity);

        virtual protected void Modify(T entity, string groupName)
        {
            Repository.Update(entity);
            TrySave(entity);

            Clients.OthersInGroup(groupName).modified(entity);
        }

        public abstract void Modify(T entity);

        virtual public void Delete(T entity, string groupName)
        {
            Repository.Delete(entity);
            TrySave(entity);

            Clients.Group(groupName, Context.ConnectionId).deleted(entity);
        }

        public abstract void Delete(T entity);

        virtual public IEnumerable<T> GetAll()
        {
            //TODO: Authentication Hub, Service, AngSvc
            AddCallerToGroup(DefaultAuthenticatedGroup);

            return String.IsNullOrEmpty(IncludeProperties)
                ? Repository.Get().ToList()
                : Repository.Get(includeProperties: IncludeProperties).ToList();
        }

        virtual public T GetById(int id)
        {
            return Repository.GetById(id);
        }

        protected void SendError(object error)
        {
            Clients.Caller.errorFromHub(error);
        }

        protected void TrySave(T entity)
        {
            try
            {
                UnitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                LogError(ex, entity);
            }
            
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

        //TODO: in production it must be real logging
        virtual protected void LogError(Exception ex, T entity)
        {
            var msg = ErrorMessageHelper.GetMessage(ex);
            var err = new
            {
                message = msg,
                entity
            };
            SendError(err);

            throw ex;
        }
    }
}