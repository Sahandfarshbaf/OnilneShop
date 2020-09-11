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
     public IActionResult product()
        {
            return View();
        }
  public IActionResult category()
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

    }
}
