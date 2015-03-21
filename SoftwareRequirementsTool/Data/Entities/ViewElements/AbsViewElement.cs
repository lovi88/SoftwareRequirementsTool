using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data
{
    public abstract class AbsViewElement : IViewElement
    {
        public int ID { get; set; }

        public IElement Element { get; set; }

        public abstract float AbstractionLevel { get; set; }
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
