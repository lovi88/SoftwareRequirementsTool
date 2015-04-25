using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Ninject;
using Owin;
using SoftwareRequirementsTool.Data.Repositories;
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
            var config = new HubConfiguration {Resolver = resolver};

            //Dependency Injection Bindings
            SetSoftrReqToolBindings(kernel);
            
            //SignalR Configuration
            ConfigureSignalR(app, config);
        }

        public static void ConfigureSignalR(IAppBuilder app, HubConfiguration config)
        {
            app.MapSignalR(config);
        }

        public static void SetSoftrReqToolBindings(StandardKernel kernel)
        {
            kernel.Bind<IUnitOfWork>()
                .To<UnitOfWork>();
            //.InSingletonScope();
        }
    }
}
