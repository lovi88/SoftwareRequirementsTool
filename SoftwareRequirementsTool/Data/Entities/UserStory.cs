﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data
{
    class UserStory : AbsElement
    {

        public string Story { get; set; }
        public Action Role { get; set; }
        public UseCase Activity { get; set; }

        public BusinessValue BusinessValue { get; set; }


        float abstractionLevel = 1;

        public override float AbstractionLevel
        {
            get { return abstractionLevel; }
            set { abstractionLevel = value; }
        }
    }
}