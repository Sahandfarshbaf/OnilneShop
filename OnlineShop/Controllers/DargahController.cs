﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZarinpalSandbox;
namespace OnlineShop.Controllers
{
    public class DargahController : Controller
    {
        [Authorize]
        public IActionResult peyment()
        {
            var peyment = new Payment(50000);
            var res = peyment.PaymentRequest($"پرداخت شماره فاکتور{14566}", "https://localhost:5001/Home/OnlinePeyment/" + 123, "fa.azari.a@gmail.com", "09142334363");
            if (res.Result.Status == 100)
            {
                return Redirect("https://sandbox.zarinpal.com/pg/StartPay/" + res.Result.Authority);
            }
            else
            {
                return BadRequest();
            }



        }
        public IActionResult onlinepeyment(int id)
        {
            if (HttpContext.Request.Query["Status"] != "" &&
                HttpContext.Request.Query["Authority"] != "" && HttpContext.Request.Query["Status"].ToString().ToLower() == "ok")
            {
                string Authority = HttpContext.Request.Query["Authority"].ToString();
                var order = 50000;
                var peyment = new Payment(50000);
                var res = peyment.Verification(Authority).Result;
                if (res.Status==100)
                {
                    ViewBag.code = res.RefId;
                    return View();

                }
           }
              return null;  
        }
    }
}