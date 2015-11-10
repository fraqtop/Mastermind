using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Media;
namespace webapp.Models
{
    public class ColorsRow
    {
        public string first { get; set; }
        public string second { get; set; }
        public string third { get; set; }
        public string fourth { get; set; }

        public int[] overlap(List<string> comb)
        {
            return new int[2];
        }
    }
}
