using System;
using System.Linq;
using System.Linq.Expressions;
using SoftwareRequirementsTool.Data.Entities;

namespace SoftwareRequirementsTool.Data.Repositories.Abstracts
{
    public interface IGenericRepository<TEntity> where TEntity : class, IEntity
    {
        IQueryable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "");

        TEntity GetById(int id, string includeProperties = "");
        void Insert(TEntity entity);
        void Delete(int id);
        void Delete(TEntity entityToDelete);
        void Update(TEntity entityToUpdate);
    }
}