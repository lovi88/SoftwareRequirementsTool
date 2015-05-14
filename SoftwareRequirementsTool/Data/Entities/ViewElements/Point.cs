using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SoftwareRequirementsTool.Data.Entities.Abstracts;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    [Table("Points")]
    public class Point: AbsEntity
    {
        [DefaultValue(0f)]
        public float? X { get; set; }
        
        [DefaultValue(0f)]
        public float? Y { get; set; }

        public Point()
        {
            X = 0;
            Y = 0;
        }
    }
}
