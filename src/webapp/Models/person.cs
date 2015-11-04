using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapp.Models
{
    public class person
    {
        public string Name { get; set; }
        public int age { get; set; }
        public person(string newname, int newage)
        {
            Name = newname;
            age = newage + 20;
        }
    }
}
