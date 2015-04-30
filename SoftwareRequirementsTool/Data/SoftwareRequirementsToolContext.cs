using System.Data.Entity;
using System.Diagnostics;
using SoftwareRequirementsTool.Data.Entities;
using SoftwareRequirementsTool.Data.Entities.Connections;
using SoftwareRequirementsTool.Data.Entities.Elements;
using SoftwareRequirementsTool.Data.Entities.Elements.Abstracts;
using SoftwareRequirementsTool.Data.Entities.ViewElements;
using SoftwareRequirementsTool.Data.Entities.ViewElements.Abstracts;

namespace SoftwareRequirementsTool.Data
{


    public class SoftwareRequirementsToolContext : DbContext
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
        public DbSet<DiagramPart> DiagramParts { get; set; }
        public DbSet<UseCaseView> UseCaseViews { get; set; }

        //Connection
        public DbSet<Connection> Connections { get; set; }

        //Other
        public DbSet<Point> Points { get; set; }
        public DbSet<Stereotype> Stereotypes { get; set; }

        public SoftwareRequirementsToolContext()
            : base("name=DefaultConnection")
        {
            DeleteDb();
        }

        private static int _cnt;
        [Conditional("DEBUG")]
        private void DeleteDb()
        {
            if (_cnt++ == 0 && Database.Exists())
            {
                Database.Delete();
            }
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Project>()
        //        .HasMany(x => x.UserStories)
        //        .WithOptional(x => x.ContainerProject)
        //        .WillCascadeOnDelete(true);

        //    modelBuilder.Entity<Project>()
        //        .HasMany(x => x.Diagrams)
        //        .WithOptional(diag => diag.ContainerProject)
        //        .WillCascadeOnDelete(true);

        //    base.OnModelCreating(modelBuilder);
        //}
    }

}
