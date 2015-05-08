using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareRequirementsTool.Data.Entities.Elements.Abstracts
{
    [Table("AbsElements")]
    public abstract class AbsElement : AbsEntity, IElement
    {
        //[Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public abstract float AbstractionLevel { get; set; }

        public int ContainerProjectId { get; set; }
        [ForeignKey("ContainerProjectId")]
        virtual public Project ContainerProject { get; set; }

        //Todo: ~USER
        virtual public string Author { get; set; }
        
        public int CompareTo(IComparableByAbstraction other)
        {
            if (other == null)
            {
                throw new ArgumentException();
            }

            const double tolerance = 0.1;
            return (this.AbstractionLevel < other.AbstractionLevel) ? -1 :
                (Math.Abs(other.AbstractionLevel - this.AbstractionLevel) < tolerance) 
                ? 0 
                : 1;
        }
    }

}
