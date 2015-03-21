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
            
            //AngularJS
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.min.js",
                      "~/Scripts/angular-ui-router.min.js", 
                      "~/Scripts/angular-route.min.js",
                      "~/Scripts/angular-animate.min.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/angularCss").Include(
                      "~/Content/Angular.css"));


            //RaphaelJs
            bundles.Add(new ScriptBundle("~/bundles/raphael").Include(
                      "~/Scripts/raphael-min.js"));

            bundles.Add(new ScriptBundle("~/bundles/fabricjs").Include(
                      "~/Scripts/fabricjs-min.js"));



            var softReqToolApp = new ScriptBundle("~/bundles/softReqToolApp");

            softReqToolApp.Include("~/app/app.js");
            softReqToolApp.IncludeDirectory("~/app/blocks", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/features", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/layout", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/services", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/widgets", "*.js", true);


            bundles.Add(softReqToolApp);


            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.min.css",
                      "~/Content/font-awesome.css",
                      "~/Content/site.css"));

        }
    }
}
