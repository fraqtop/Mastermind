using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using webapp.Models;
using Newtonsoft.Json;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace webapp.Controllers
{
    public class HelloController : Controller
    {
        public string md { get; set; }
        [Route("[controller]/[action]")]
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Game(string mode)
        {
            ViewBag.colours = new List<string>() { "green","black","red","pink","yellow" };
            ViewBag.mode = mode;
            md = mode;
            return View();
        }
        public string answer(string cols)
        {
            ColorsRow raw = JsonConvert.DeserializeObject<ColorsRow>(cols);
            return raw.first;
        }
    }
}
