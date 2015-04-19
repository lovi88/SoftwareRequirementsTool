﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Connections;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.ViewElements;

namespace SoftwareRequirementsTool.Data
{
    public class SoftwareRequirementsToolContext: DbContext 
    {

        //Bases
        public DbSet<AbsEntity> AbsEntities { get; set; }
        public DbSet<AbsView> AbsViews { get; set; }
        public DbSet<AbsElement> AbsElements { get; set; }

        //AbsElement-s
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Diagram> Diagrams { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<UseCase> UseCases { get; set; }
        public DbSet<UserStory> UserStories { get; set; }

        //AbsView-s
        public DbSet<ActorView> ActorViews { get; set; }
        public DbSet<DiagramElement> DiagramElements { get; set; }
        public DbSet<UseCaseView> UseCaseViews { get; set; }
        
        //Connection
        public DbSet<Connection> Connections { get; set; }

        //Other
        public DbSet<Point> Points { get; set; }
        public DbSet<Stereotype> Stereotypes { get; set; }
        
    }

}
