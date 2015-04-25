﻿using System.Collections.Generic;
using Newtonsoft.Json;


namespace SoftwareRequirementsTool.Data.Entities.Elements
{
    public class Project : AbsElement
    {
        public override float AbstractionLevel
        {
            get { return 0; }
            set { }
        }

        [JsonIgnore]
        public List<UserStory> UserStories { get; set; }

        [JsonIgnore]
        public List<Diagram> Diagrams { get; set; }
    }
}