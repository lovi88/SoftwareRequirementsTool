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
        public int ID { get; set; }
        public string Name { get; set; }

        public string ShortDescription { get; set; }

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

            return (this.AbstractionLevel < other.AbstractionLevel) ? -1 :
                (other.AbstractionLevel == this.AbstractionLevel) ? 0 : 1;
        }
    }

}
