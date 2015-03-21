using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Utilities
{
    public class GenericEventArgs<T>: EventArgs
    {
        public T Content { get; protected set; }

        public GenericEventArgs(T content):base()
        {
            Content = content;
        }

    }
}
