﻿using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareRequirementsTool.Data.Entities
{
    public abstract class AbsEntity:IEntity
    {
        public int Id { get; set; }
        [NotMapped]
        public string TypeName
        {
            get { return GetType().Name; }
        }
    }
}