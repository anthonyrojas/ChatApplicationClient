using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace ChatApp.Model
{
    public class ServerHttpClient
    {
        private static String host = "https://arojas95.com";
        private static readonly HttpClient client;
        static ServerHttpClient()
        {
            client = new HttpClient();
        }
    }
}
