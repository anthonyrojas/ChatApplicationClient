using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientApp.Models
{
    class Message
    {
        public String ID { get; set; }
        public String Content { get; set; }
        public User Sender { get; set; }
        public Conversation MessageConversation { get; set; }
    }
}
