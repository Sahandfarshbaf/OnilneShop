using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineShop.Tools.Zarinpal;
using RestSharp;
using System.Text.Json;
using Newtonsoft.Json.Linq;

namespace OnlineShop.Tools.ZarinPal
{
    public class ZarinPal
    {
        private readonly string merchant_id = "82f5b82a-3422-4f9e-bb4d-0182c4dbf5a6";

        public ZarinPalRequestResponse Request(ZarinPallRequest zarinPallRequest)
        {
            zarinPallRequest.merchant_id = merchant_id;
            zarinPallRequest.callback_url = "";
            
            var body = JsonSerializer.Serialize(zarinPallRequest);

            var client = new RestClient("https://api.zarinpal.com/pg/v4/payment/request.json");
            var request = new RestRequest(Method.POST);
            request.AddJsonBody(body);

            IRestResponse response = client.Execute(request);
            var data = ((Newtonsoft.Json.Linq.JContainer) JObject.Parse(response.Content).First).First.ToString();
            var error = ((Newtonsoft.Json.Linq.JContainer)JObject.Parse(response.Content).First).Next.First.ToString();
            if (data == "[]")
            {
                var result = JsonSerializer.Deserialize<ZarinPalRequestResponse>(error);
                return result;
            }
            else
            {
                var result = JsonSerializer.Deserialize<ZarinPalRequestResponse>(data);
                return result;
            }

          
          
        }

    }
}
