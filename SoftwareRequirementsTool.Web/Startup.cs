using Microsoft.Ajax.Utilities;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Ninject;
using Owin;
using System.Diagnostics;
using SoftwareRequirementsTool.Data.Repositories;
using SoftwareRequirementsTool.Data.UnitOfWork;
using SoftwareRequirementsTool.Web;
using SoftwareRequirementsTool.Web.Dependencies;

[assembly: OwinStartup(typeof(Startup))]

namespace SoftwareRequirementsTool.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            //Ninject
            var kernel = new StandardKernel();
            var resolver = new NinjectSignalRDependencyResolver(kernel);

            //Dependency Injection Bindings
            SetSoftrReqToolBindings(kernel);
            
            //SignalR Configuration
            var config = new HubConfiguration {Resolver = resolver};
            
            
            SetDetailedErrorMessages(config);
            ConfigureSignalR(app, config);
        }

        public static void ConfigureSignalR(IAppBuilder app, HubConfiguration config)
        {
            app.MapSignalR(config);
        }

        [Conditional("DEBUG")]
        public static void SetDetailedErrorMessages(HubConfiguration config)
        {
            config.EnableDetailedErrors = true;
        }

        public static void SetSoftrReqToolBindings(StandardKernel kernel)
        {
            kernel.Bind<IUnitOfWork>()
                .To<UnitOfWork>();
            //.InSingletonScope();
        }
    }
}
