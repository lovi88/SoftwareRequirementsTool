using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("Stereotype")]
    public class Stereotype : AbsEntity
    {
        public string Name { get; set; }
    }
}
