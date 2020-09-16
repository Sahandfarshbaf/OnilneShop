using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZarinPal;
using ZarinPal.Class;

namespace OnlineShop.Controllers.ApiControllers
{     
    [Route("api/")]
    [ApiController]
    public class DargahController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public DargahController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("ZarinPal/ConectDargah")]
        public IActionResult peyment()
        {
            try
            {
                var result = _repository.PaymentType.FindByCondition(c => c.DaUserId.Equals(null) && c.DuserId.Equals(null))
                      .Select(c => new { c.Id, c.Title, c.Icon, c.Description }).ToList();
                _logger.LogInfo($"Returned PaymentType List");
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside GetPaymentTypeList action: {e.Message}");
                return BadRequest("Internal server error");
            }
        }

        public IActionResult peyment1()
        {
            //var peyment = new Payment();
            //var res = peyment.Request($"پرداخت شماره فاکتور{14566}", "https://localhost:5001/Dargah/OnlinePeyment/" + 123, "fa.azari.a@gmail.com", "09142334363");
            //if (res.Result.Status == 100)
            //{
            //    return Redirect("https://sandbox.zarinpal.com/pg/StartPay/" + res.Result.Authority);
            //}
            //else
            //{
            return BadRequest();
            //}



        }
        public IActionResult onlinepeyment(int id)
        {
           // if (HttpContext.Request.Query["Status"] != "" &&
           //     HttpContext.Request.Query["Authority"] != "" && HttpContext.Request.Query["Status"].ToString().ToLower() == "ok")
           // {
           //     string Authority = HttpContext.Request.Query["Authority"].ToString();
           //     var order = 50000;
           //     var peyment = new Payment(50000);
           //     var res = peyment.Verification(Authority).Result;
           //     if (res.Status==100)
           //     {
           //         ViewBag.code = res.RefId;
           //         return View();

           //     }
           //}
              return null;  
        }
    }
}
