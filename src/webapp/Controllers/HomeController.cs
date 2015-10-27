using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using webapp.Models;

namespace webapp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            string appName = "My fst ASP app";
            ViewBag.Message = "ASP.NET 5 Rocks!"+appName;
            var serverinfo = new ServerinfoViewModel()
            {
                Name = Environment.MachineName,
                Software = Environment.OSVersion.ToString()
            };
            return View(serverinfo);
        }
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
