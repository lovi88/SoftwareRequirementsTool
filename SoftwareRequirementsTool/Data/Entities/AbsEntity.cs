﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Core.Objects;

namespace SoftwareRequirementsTool.Data.Entities
{
    [Table("AbsEntities")]
    public abstract class AbsEntity:IEntity
    {
        public int Id { get; set; }
        [NotMapped]
        public string TypeName
        {
            get
            {
                var fullName = GetType().FullName;
                
                string name;
                if (fullName.Contains("System.Data.Entity.DynamicProxies"))
                {
                    var realType = ObjectContext.GetObjectType(this.GetType());
                    name = realType.Name;
                }
                else
                {
                    name = GetType().Name;
                }
                
                return name;
            }
        }
    }
}
