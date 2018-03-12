using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace ClientApp.Models
{
    class ChatAppHttpClient
    {
        private static readonly HttpClient client;
        static ChatAppHttpClient()
        {
            client = new HttpClient();
        }

        static async Task<User> LogIn() {
        }

        // TODO: make methods for each function on the server. 
        // For example, send messages, create conversations, etc.
        // Domain for http client will be: arojas95.com
    }
}
