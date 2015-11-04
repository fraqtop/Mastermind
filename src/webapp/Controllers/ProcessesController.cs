using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNet.Mvc;
using webapp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace webapp.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProcessesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<ProcessInfoViewModel> getproc()
        {
            var proclist = Process.GetProcesses().OrderBy(p => p.ProcessName);
            return proclist.Select(p => new ProcessInfoViewModel() { Name = p.ProcessName });
        }
    }
}
