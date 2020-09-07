using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HandiCraft.Areas.admin.Controllers
{
    [Area("Admin")]

    public class HomeController : Controller
    {

        public IActionResult product()
        {
            return View();
        }
        public IActionResult login()
        {
            return View();
        }
    }
}