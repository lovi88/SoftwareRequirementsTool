using System;
namespace SoftwareRequirementsTool.Data
{
    interface IViewElement: IComparableByAbstraction
    {
        IElement Element { get; set; }
        int ID { get; set; }
    }
}
