﻿using System.Collections.Generic;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    public class Diagram: AbsElement
    {
        public List<DiagramElement> DiagramElements { get; set; }

        float _abstractionLevel = 0.5f;
        public override float AbstractionLevel
        {
            get { return _abstractionLevel; }
            set { _abstractionLevel = value; }
        }


    }
}
