using System.Web.Optimization;

namespace SoftwareRequirementsTool.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/bootstrap-notify.min.js")); //bootstramp-notify is a 3rd party package

            // AngularJS
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.min.js",
                      "~/Scripts/angular-ui-router.min.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                      "~/Scripts/angular-route.min.js",
                      "~/Scripts/angular-animate.min.js",
                      "~/Scripts/ngStorage.min.js",
                      "~/Scripts/spin.min.js", //for the spinner
                      "~/Scripts/angular-spinner.min.js"));

            bundles.Add(new StyleBundle("~/Content/angularCss").Include(
                      "~/Content/Angular.css"));

            bundles.Add(new ScriptBundle("~/bundles/d3").Include(
                      "~/Scripts/d3/d3.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/SignalR").Include(
                    "~/Scripts/jquery.signalR-2.2.0.min.js"));

            // The Core Business Logic in Typescript
            var softReqToolCore = new ScriptBundle("~/bundles/softReqToolCore");

            IncludeSoftReqToolCore(softReqToolCore);
            bundles.Add(softReqToolCore);

            // App Files
            var softReqToolApp = new ScriptBundle("~/bundles/softReqToolApp");

            IncludeSoftReqToolApp(softReqToolApp);
            bundles.Add(softReqToolApp);

            // Design
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.min.css",
                      "~/Content/font-awesome.css",
                      "~/Content/animate.css", //http://daneden.github.io/animate.css/
                      "~/Content/site.css"));
        }

        private static void IncludeSoftReqToolApp(Bundle softReqToolApp)
        {
            // Logic and AngularJs setups
            softReqToolApp.Include("~/app/app.js");

            // BusinessLogic in AngularJs
            softReqToolApp.IncludeDirectory("~/app/blocks", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/services", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/widgets", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/layout", "*.js", true);
            softReqToolApp.IncludeDirectory("~/app/features", "*.js", true);
        }

        private static void IncludeSoftReqToolCore(Bundle softReqToolCore)
        {
            // (warning !!!) The sequence of .js files is matters, because of inheritence
            softReqToolCore.IncludeDirectory("~/app/core/utils", "*.js", true);

            softReqToolCore.IncludeDirectory("~/app/core/entities/abstracts", "*.js", true);
            softReqToolCore.IncludeDirectory("~/app/core/entities/concrete", "*.js", true);

            softReqToolCore.IncludeDirectory("~/app/core/api/abstracts", "*.js", true);
            softReqToolCore.IncludeDirectory("~/app/core/api/concrete", "*.js", true);

            softReqToolCore.IncludeDirectory("~/app/core/instantiation", "*.js", true);
        }
    }
}