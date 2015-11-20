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
            int[] answer = new int[2];
            int multi_penetration;
            List<string> row = new List<string>() { first, second, third, fourth };
            for (int i = 0; i < 4; i++)
            {
                multi_penetration = 0;
                for (int j = 0; j < 4; j++)
                {
                    if (comb[i].ToLower() == row[j] && i == j) answer[1]++;
                    if (comb[i].ToLower() == row[j]) { answer[0]++; multi_penetration++; }
                }
                if (multi_penetration > 1) answer[0] -= (multi_penetration - 1);
            }
            return answer;
        }
    }
}
