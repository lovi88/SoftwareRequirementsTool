using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TypeLite;

namespace SoftwareRequirementsTool.Data
{
    [TsClass]
    public abstract class AbsElement : IElement
    {
        public object Id { get; set; }
        public string Name { get; set; }

        public string ShortDescription { get; set; }

        public string TypeName
        {
            get { return GetType().Name; }
        }

        public string Description { get; set; }

        public abstract float AbstractionLevel { get; set; }

        //~USER
        public string Author { get; set; }

        public List<IElement> ConnectedElements { get; set; }

        public List<AbsViewElement> ConnectedViews { get; set; }


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
