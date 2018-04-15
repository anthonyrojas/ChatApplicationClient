using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using ChatApp.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ChatApp.Model
{
    public class ServerHttpClient
    {
        private static string host = "http://localhost:3000";
        //private static String host = "https://arojas95.com";
        private static readonly HttpClient client;
        static ServerHttpClient()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(host);
        }

        // POST route: /user
        public async Task<HttpResponseMessage> CreateUser(string body)
        {
            HttpRequestMessage req = new HttpRequestMessage(HttpMethod.Post, host + "/register")
            {
                Content = new StringContent(body, Encoding.ASCII, "application/json")
            };
            return await client.SendAsync(req);
        }
    }
}
