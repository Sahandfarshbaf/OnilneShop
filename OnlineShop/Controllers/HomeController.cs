﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace OnlineShop.Controllers
{
    public class HomeController : Controller
    {
        
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult register()
        {
            return View();
        }
        public IActionResult product()
        {
            return View();
        }
            public IActionResult productwer()
        {
            return View();
        }
        public IActionResult Category()
        {
            return View();
        }
        public IActionResult blog()
        {
            return View();
        }
        public IActionResult login()
        {
            return View();
        }
        public IActionResult loginAdmin()
        {
            return View();
        }
        public IActionResult ContactUS()
        {
            return View();
        }
        public IActionResult abouat()
        {
            return View();
        }
       [Authorize("Customer")]
        public IActionResult Cart()
        {
            return View();
        }
        [Authorize("Customer")]
        public IActionResult Checkout()
        {
            return View();
        }

        public IActionResult OnlinePaymentResult()
        {
            return View();
        }
  public IActionResult listSefaresh()
        {
            return View();
        }

        public IActionResult سفارش()
        {
            return View();
        }
    }
}
