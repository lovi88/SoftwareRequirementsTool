using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    [Table("Projects")]
    public class Project: AbsEntity
    {
        
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

    }
}
