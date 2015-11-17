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
        public static List<string> combination = new List<string>();
        [Route("[controller]/[action]")]
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Game(string mode)
        {
            var palette = new List<string>() { "#000000", "#FE2E2E", "#58FA58", "#2E64FE",
                                            "#F7FE2E", "#FA58AC", "#848484", "#FE9A2E" };
            Random rnd = new Random();
            combination.Clear();
            for (int i = 0; i < 4; i++)
            {
                combination.Add(palette[rnd.Next(0, 7)]);
            }
            ViewBag.colours = palette;
            ViewBag.mode = mode;
            return View();
        }
        public int[] answer(string cols)
        {
            ColorsRow raw = JsonConvert.DeserializeObject<ColorsRow>(cols);
            return raw.overlap(combination);
        }
    }
}
