﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareRequirementsTool.Data.Entities.ViewElements
{
    public class Point: IEntity
    {
        public int Id { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
    }
}
