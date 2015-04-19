using System;
using System.ComponentModel.DataAnnotations.Schema;
using TypeLite;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    [TsClass]
    public abstract class AbsElement : AbsEntity, IElement
    {
        public string Name { get; set; }

        [NotMapped]
        public string TypeName
        {
            get { return GetType().Name; }
        }

        public string Description { get; set; }

        public abstract float AbstractionLevel { get; set; }

        //Todo: ~USER
        public string Author { get; set; }
        
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
