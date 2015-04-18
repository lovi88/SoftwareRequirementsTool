using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;

using System.Linq.Expressions;
using SoftwareRequirementsTool.Data.Entities;

namespace SoftwareRequirementsTool.Data
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : class, IEntity
    {
        protected SoftwareRequirementsToolContext Context;
        protected DbSet<TEntity> DbSet;

        public GenericRepository(SoftwareRequirementsToolContext context)
        {
            this.Context = context;
            this.DbSet = context.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = DbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            query = AddQueryIncludeProperties(includeProperties, query);

            if (orderBy != null)
            {
                return orderBy(query);
            }

            return query;
        }

        public virtual TEntity GetById(object id, string includeProperties = "")
        {
            if (includeProperties == String.Empty)
            {
                return DbSet.Find(id);
            }

            IQueryable<TEntity> query = DbSet;

            query = AddQueryIncludeProperties(includeProperties, query);

            var item = query.SingleOrDefault(i => i.Id == id);
            return item;
        }


        public virtual void Insert(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            var entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (Context.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            DbSet.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        private static IQueryable<TEntity> AddQueryIncludeProperties(string includeProperties, IQueryable<TEntity> query)
        {
            foreach (var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            return query;
        }
    }
}