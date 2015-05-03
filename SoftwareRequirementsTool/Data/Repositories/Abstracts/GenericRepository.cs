using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Repositories.Abstracts
{
    abstract public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : class, IEntity
    {
        protected SoftwareRequirementsToolContext Context;
        protected DbSet<TEntity> DbSet;

        protected GenericRepository(SoftwareRequirementsToolContext context)
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

        public virtual TEntity GetById(int id, string includeProperties = "")
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
            AssertIntegrity(entity);
            ManageForeignKeyConstraits(entity);

            DbSet.Add(entity);
        }

        public virtual void Delete(int id)
        {
            var entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
        }

        

        public virtual void Delete(TEntity entityToDelete)
        {
            entityToDelete = DbSet.Find(entityToDelete.Id);

            if (Context.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            AssertIntegrity(entityToUpdate);
            ManageForeignKeyConstraits(entityToUpdate);

            DbSet.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        protected abstract void AssertIntegrity(TEntity entity);
        protected abstract void ManageForeignKeyConstraits(TEntity entity);

        protected int ForeignKeyHelper(IEntity keyEntity, int foreignKey)
        {
            if (keyEntity != null)
            {
                foreignKey = keyEntity.Id;
                return foreignKey;
            }

            if (foreignKey != 0)
            {
                return foreignKey;
            }

            throw new ArgumentException("the foreign key must have be set");
        }


        //abstract protected void TouchDb(TEntity entity);

        protected virtual void CreateIfNeeded(IEntity entity)
        {
            Context.AbsEntities.Add((AbsEntity)entity);
            Context.SaveChanges();
        }

        protected void Attach(TEntity entity)
        {
            DbSet.Attach(entity);
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