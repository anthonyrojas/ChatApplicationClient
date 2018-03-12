using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Models
{
    class Invitation
    {
        public String ID { get; set; }
        public Conversation Convo { get; set; }
        public User SendTo { get; set; }
    }
}
