using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.BusinessModel;
using Entities.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Tools;

namespace OnlineShop.Controllers
{

    public class AccountController : Controller
    {


        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private IRepositoryWrapper _repository;


        public AccountController(IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, IRepositoryWrapper repository)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Register()
        {

            return View();
        }
        [HttpGet]
        public IActionResult فروشنده()
        {

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> فروشنده(UserRegistrationModel userModel)
        {

            if (!ModelState.IsValid)
            {
                return View(userModel);
            }
            var user = _mapper.Map<User>(userModel);
            var result = await _userManager.CreateAsync(user, userModel.Password);
            Seller seller = new Seller();
            seller.Cdate = DateTime.Now.Ticks;
            seller.CuserId = user.Id;
            seller.Mobile = long.Parse(user.PhoneNumber.Substring(1, 10));
            seller.Name = user.FirstName;
            seller.Fname = user.LastName;
            seller.Email = user.NormalizedEmail;
            seller.UserId = user.Id;
            seller.MelliCode = user.NationalCode;
            _repository.Seller.Create(seller);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return View(userModel);
            }
            _repository.Save();
            await _userManager.AddToRoleAsync(user, "SELLER");
            SendSMS sendSms = new SendSMS();
            var smsresult = sendSms.SendRegisterSMS(userModel.PhoneNumber, userModel.Email, userModel.Password);
            SendEmail sendEmail = new SendEmail();
            sendEmail.SendRegisterEmail(userModel.Password, userModel.Email);

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(UserRegistrationModel userModel)
        {

            if (!ModelState.IsValid)
            {
                return View(userModel);
            }
            var user = _mapper.Map<User>(userModel);
            var result = await _userManager.CreateAsync(user, userModel.Password);
            Customer customer = new Customer();
            customer.Cdate = DateTime.Now.Ticks;
            customer.CuserId = user.Id;
            customer.Mobile =long.Parse(user.PhoneNumber.Substring(1,10));
            customer.Name = user.FirstName;
            customer.Fname = user.LastName;
            customer.Email = user.NormalizedEmail;
            customer.UserId = user.Id;
            _repository.Customer.Create(customer);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return View(userModel);
            }
            _repository.Save();
            await _userManager.AddToRoleAsync(user, "CUSTOMER");
            SendSMS sendSms = new SendSMS();
            var smsresult = sendSms.SendRegisterSMS(userModel.PhoneNumber, userModel.Email, userModel.Password);
            SendEmail sendEmail=new SendEmail();
            sendEmail.SendRegisterEmail(userModel.Password,userModel.Email);

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }


        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(UserLoginModel userModel, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(userModel);
            }

            var result = await _signInManager.PasswordSignInAsync(userModel.Email, userModel.Password, userModel.RememberMe, false);
            if (result.Succeeded)
            {
                return RedirectToLocal(returnUrl);
            }
            else
            {
                ModelState.AddModelError("", "Invalid UserName or Password");
                return View();
            }


        }

        [HttpGet]
        public IActionResult AdminLogin(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AdminLogin(UserLoginModel userModel, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(userModel);
            }

            var result = await _signInManager.PasswordSignInAsync(userModel.Email, userModel.Password, userModel.RememberMe, false);
         


            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(userModel.Email);
                var roles = await _userManager.GetRolesAsync(user);
                
                if (roles.FirstOrDefault() == "Admin")
                {
                    return RedirectToAction("Index", "Home", new { area = "Admin" });
                }
                else
                {
                    ModelState.AddModelError("", "نام کاربری یا کلمه عبور صحیح نمی باشد.");
                    return View();
            
                }

            }
            else
            {
                ModelState.AddModelError("", "نام کاربری یا کلمه عبور صحیح نمی باشد.");
                return View();
            }


        }


        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
                return Redirect(returnUrl);
            else
                return RedirectToAction(nameof(HomeController.Index), "Home");

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
    }
}