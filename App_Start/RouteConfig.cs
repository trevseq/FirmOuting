using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace FirmOuting
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                           name: "DefaultApi",
                           routeTemplate: "api/{controller}/{id}",
                           defaults: new { id = RouteParameter.Optional }
                       );

            routes.MapRoute(
                name: "Secure",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Secure", action = "Default", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Home",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Default", id = UrlParameter.Optional }
            );
        }
    }
}