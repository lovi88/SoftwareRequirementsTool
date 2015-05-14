using System.ComponentModel.DataAnnotations.Schema;
using SoftwareRequirementsTool.Data.Entities.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("Stereotype")]
    public class Stereotype : AbsEntity
    {
        public string Name { get; set; }
    }
}
