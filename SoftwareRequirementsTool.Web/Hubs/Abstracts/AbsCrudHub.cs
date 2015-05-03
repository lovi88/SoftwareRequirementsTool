using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.SignalR;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Repositories.Abstracts;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Utilities.ErrorMessages;
using SoftwareRequirementsTool.Web.Hubs.Helpers;

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
        public abstract void Delete(T entity);

        virtual public T GetById(int id)
        {
            return Repository.GetById(id);
        }

        #endregion

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

        #endregion

        #region Template Methods

        virtual protected T Create(T entity, string groupName)
        {
            Repository.Insert(entity);
            TrySave(ref entity);

            BeforeCallBack(ref entity);
            CreateCallback(entity, groupName);
            return entity;
        }


        virtual protected void Modify(T entity, string groupName)
        {

            Repository.Update(entity);
            TrySave(ref entity);

            BeforeCallBack(ref entity);
            ModifyCallback(entity, groupName);
        }



        virtual public void Delete(T entity, string groupName)
        {
            Repository.Delete(entity);
            TrySave(ref entity);
        }

        #endregion

        #region Template Hooks

        // create & modify & delete -> save hook
        protected virtual void TrySave(ref T entity)
        {
            try
            {
                UnitOfWork.SaveChanges();
            }
            catch (Exception ex)
            {
                LogError(ex, entity);
                UnitOfWork.Dispose();
            }
        }

        //create & modify hook
        protected abstract void BeforeCallBack(ref T entity);

        //create hook
        protected virtual void CreateCallback(T entity, string groupName)
        {
            //Clients.OthersInGroup(groupName).created(entity);
            Clients.Clients(_groupHelper.AllInGroupExcept(groupName, Context.ConnectionId))
                .created(entity);
        }

        //modify hook
        protected virtual void ModifyCallback(T entity, string groupName)
        {
            //Clients.OthersInGroup(groupName).modified(entity);
            Clients.Clients(_groupHelper.AllInGroupExcept(groupName, Context.ConnectionId))
                .modified(entity);
        }
        
        #endregion


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



        //Future: in production it must be real logging
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