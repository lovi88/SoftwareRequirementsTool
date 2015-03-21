using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data
{
    public interface IComparableByAbstraction: IComparable<IComparableByAbstraction>
    {
        float AbstractionLevel { get; set; }
    }
}
