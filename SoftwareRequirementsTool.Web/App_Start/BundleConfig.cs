using System.Web;
using System.Web.Optimization;

namespace SoftwareRequirementsTool.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            // AngularJS
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.min.js",
                      "~/Scripts/angular-ui-router.min.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                      "~/Scripts/angular-route.min.js",
                      "~/Scripts/angular-animate.min.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/angularCss").Include(
                      "~/Content/Angular.css"));



            bundles.Add(new ScriptBundle("~/bundles/d3").Include(
                      "~/Scripts/d3/d3.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/SignalR").Include(
                    "~/Scripts/jquery.signalR-2.2.0.min.js"
                )
            );


            // App Files
            var softReqToolApp = new ScriptBundle("~/bundles/softReqToolApp");
            
            // The Core Business Logic
            // The sequence of .js file is matters, because of inheritence (warning !!!)
            softReqToolApp.IncludeDirectory("~/app/core/utils", "*.js", true);
            
            softReqToolApp.IncludeDirectory("~/app/core/api/abstracts", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/core/api/concrete", "*.js", true);

            softReqToolApp.IncludeDirectory("~/app/core/entities/abstracts", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/core/entities/concrete", "*.js", true);

            softReqToolApp.IncludeDirectory("~/app/core/modelling/abstracts", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/core/modelling/concrete", "*.js", true);


            // Logic and AngularJs setups
            softReqToolApp.Include("~/app/app.js");

            softReqToolApp.IncludeDirectory("~/app/blocks", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/features", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/layout", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/services", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/widgets", "*.js", true);

            bundles.Add(softReqToolApp);



            //Design
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.min.css",
                      "~/Content/font-awesome.css",
                      "~/Content/site.css"));

        }

    }
}
