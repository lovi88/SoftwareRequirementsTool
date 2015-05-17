using Microsoft.AspNet.SignalR;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Utilities.ErrorMessages;
using SoftwareRequirementsTool.Web.Hubs.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;

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
            _groupHelper = GroupHelper.Instance;
        }

        #region IGenericRepository

        abstract public T Create(T entity);

        public abstract void Modify(T entity);

        public abstract void Refresh(T entity);

        public abstract bool Delete(T entity);

        virtual public T GetById(int id)
        {
            return Repository.GetById(id);
        }

        #endregion IGenericRepository

        #region Grouping

        private readonly GroupHelper _groupHelper;

        protected void AddCallerToGroup(string groupName)
        {
            //Groups.Add(Context.ConnectionId, groupName);
            _groupHelper.AddCallerToGroup(Context.ConnectionId, groupName);
        }

        protected void RemoveCallerFromGroup(string groupName)
        {
            //Groups.Remove(Context.ConnectionId, groupName);
            _groupHelper.RemoveCallerFromGroup(Context.ConnectionId, groupName);
        }

        #endregion Grouping

        #region Template Methods

        virtual protected T Create(T entity, string groupName)
        {
            Repository.Insert(entity);
            TrySave(ref entity);

            BeforeCallBack(ref entity);
            CreateBroadcast(entity, groupName);
            return entity;
        }

        virtual protected void Modify(T entity, string groupName)
        {
            Repository.Update(entity);
            TrySave(ref entity);

            BeforeCallBack(ref entity);
            ModifyBroadcast(entity, groupName);
        }

        virtual protected void Refresh(T entity, string groupName)
        {
            ModifyBroadcast(entity, groupName);
        }

        virtual public bool Delete(T entity, string groupName)
        {
            Repository.Delete(entity);
            var saveResult = TrySave(ref entity);

            if (saveResult)
            {
                DeleteBroadcast(entity, groupName);    
            }

            return saveResult;
        }

        #endregion Template Methods

        #region Template Hooks

        // create & modify & delete -> save hook
        protected virtual bool TrySave(ref T entity)
        {
            try
            {
                UnitOfWork.SaveChanges();
                return true;
            }
            catch (DbUpdateException)
            {
                SendError(new {message = "Violation of of database constraints",entity});
            }
            catch (Exception ex)
            {
                LogError(ex, entity);
                UnitOfWork.Dispose();
            }

            return false;
        }

        //create & modify hook
        protected abstract void BeforeCallBack(ref T entity);

        //create hook
        protected virtual void CreateBroadcast(T entity, string groupName)
        {
            //Clients.OthersInGroup(groupName).created(entity);
            Clients.Clients(_groupHelper.AllInGroupExcept(groupName, Context.ConnectionId))
                .created(entity);
        }

        //modify hook
        protected virtual void ModifyBroadcast(T entity, string groupName)
        {
            //Clients.OthersInGroup(groupName).modified(entity);
            Clients.Clients(_groupHelper.AllInGroupExcept(groupName, Context.ConnectionId))
                .modified(entity);
        }

        //delete hook
        protected virtual void DeleteBroadcast(T entity, string groupName)
        {
            //Clients.OthersInGroup(groupName).modified(entity);
            Clients.Clients(_groupHelper.AllInGroupExcept(groupName, Context.ConnectionId))
                .deleted(entity);
        }

        #endregion Template Hooks

        virtual public IEnumerable<T> GetAll()
        {
            //TODO: Authentication Hub, Service, AngSvc
            AddCallerToGroup(DefaultAuthenticatedGroup);

            return String.IsNullOrEmpty(IncludeProperties)
                ? Repository.Get().ToList()
                : Repository.Get(includeProperties: IncludeProperties).ToList();
        }

        protected void SendError(object error)
        {
            Clients.Caller.errorFromHub(error);
        }

        protected void SendFatal(object error)
        {
            Clients.Caller.fatalFromHub(error);
        }

        protected void SendInfo(object info, string groupName = "", bool justOthers = false)
        {
            if (groupName == string.Empty)
            {
                Clients.Caller.infoFromHub(info);
            }
            else
            {
                if (justOthers)
                {
                    Clients.OthersInGroup(groupName).infoFromHub(info);
                }
                else
                {
                    Clients.Group(groupName).infoFromHub(info);
                }
            }
        }

        virtual protected string GenerateGroupName(IEntity entity)
        {
            return entity.TypeName + "_" + entity.Id;
        }

        //Future: in production there must be real logging
        virtual protected void LogError(Exception ex, T entity)
        {
            var msg = ErrorMessageHelper.GetMessage(ex);
            var err = new
            {
                message = msg,
                entity
            };
            SendFatal(err);
        }
    }
}