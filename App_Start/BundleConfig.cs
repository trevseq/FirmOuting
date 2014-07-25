using System.Web.Optimization;

namespace FirmOuting
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Enable CDN support
            // bundles.UseCdn = true;

            // Enable Bundling and Minification
             BundleTable.EnableOptimizations = false;



            #region Script Bundling
            //Add link to jquery on the CDN
            //var cdnJqueryPath = "http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js";
            //var cdnJqueryUIPath = "http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.min.js";

            // Add link to jquery on the CDN
            //bundles.Add(new ScriptBundle("~/bundles/jquery", cdnJqueryPath));
            //bundles.Add(new ScriptBundle("~/bundles/jqueryUI", cdnJqueryUIPath));

            // Login Layout bundle
            bundles.Add(new ScriptBundle("~/bundles/loginScripts").Include(
                        "~/scripts/jqbrowser-uncompressed.js",
                         "~/scripts/explorer-extra.js",
                         "~/scripts/default.js"));

            // Client Styl
            bundles.Add(new ScriptBundle("~/bundles/clientScripts").Include(
               "~/Scripts/Plugins/jquery-dialogextend-master/build/jquery.dialogextend.min.js",
                "~/Scripts/Plugins/posabsolute-jQuery-Validation-Engine-499f567/js/languages/jquery.validationEngine-en.js",
                "~/Scripts/Plugins/posabsolute-jQuery-Validation-Engine-499f567/js/jquery.validationEngine.js",

                         "~/Scripts/Plugins/jquery-cookie/jquery-cookie.js",
                         "~/scripts/jqbrowser-uncompressed.js",
                         "~/scripts/pqgrid.min.js",
                         "~/scripts/explorer-custom.js"));
           
            #endregion
            #region Style Bundling

            // Login Style
            bundles.Add(new StyleBundle("~/css/loginStyles")
                               .Include("~/Content/style-explorer.css",
                                "~/Content/style-custom.css",
                                "~/Content/themes/redmond/jquery-ui-1.10.3.custom.min.css"));

            // Client Style
            bundles.Add(new StyleBundle("~/css/clientStyles")
                               .Include("~/Content/style-explorer.css",
                                "~/Content/style-custom.css",
                                "~/Content/pqgrid.min.css",
                                "~/Scripts/Plugins/posabsolute-jQuery-Validation-Engine-499f567/css/validationEngine.jquery.css",
                                "~/Content/themes/redmond/jquery-ui-1.10.3.custom.min.css"));
            #endregion


        }
    }
}