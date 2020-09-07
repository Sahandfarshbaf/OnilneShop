using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public IActionResult login()
        {
            return View();
        }
        public IActionResult loginAdmin()
        {
            return View();
        }

    }
}
