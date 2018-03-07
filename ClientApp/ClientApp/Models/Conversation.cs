using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Models
{
    class Conversation
    {
        public List<User> Participants { get; set;  }
        public String ChatType { get; set; }
    }
}
