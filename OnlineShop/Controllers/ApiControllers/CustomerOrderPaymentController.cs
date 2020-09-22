using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Tools;
using OnlineShop.Tools.Zarinpal;
using OnlineShop.Tools.ZarinPal;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class CustomerOrderPaymentController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private readonly long timeTick;

        public CustomerOrderPaymentController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            this.timeTick = DateTime.Now.Ticks;
        }


        [Authorize("Customer")]
        [HttpGet]
        [Route("CustomerOrderPayment/VerifyPayment")]
        public IActionResult VerifyPayment(string Authority, string Status)
        {
            try
            {
                var orderpeymnt = _repository.CustomerOrderPayment.FindByCondition(c => c.TraceNo == Authority)
                    .FirstOrDefault();
                var CustomerOrderId = orderpeymnt.CustomerOrderId;
                if (orderpeymnt == null)
                {
                    return NotFound();
                }

                ZarinPalVerifyRequest zarinPalVerifyRequest = new ZarinPalVerifyRequest();
                zarinPalVerifyRequest.authority = Authority;
                zarinPalVerifyRequest.amount = (int)orderpeymnt.TransactionPrice.Value;

                Tools.ZarinPal.ZarinPal zarinPal = new Tools.ZarinPal.ZarinPal();
                var result = zarinPal.VerifyPayment(zarinPalVerifyRequest);
                if (result.code == 100 || result.code == 101)
                {

                    orderpeymnt.FinalStatusId = 100;
                    orderpeymnt.RefNum = result.ref_id.ToString();
                    orderpeymnt.TransactionDate = timeTick;
                    orderpeymnt.CardPan = result.card_pan;
                    _repository.CustomerOrderPayment.Update(orderpeymnt);
                    _repository.Save();
                    SendSMS sendSMS = new SendSMS();
                   
                    var mobileNo = User.Claims.Where(c => c.Type == "mobile").Select(x => x.Value).SingleOrDefault();
                    sendSMS.SendSuccessOrderPayment(mobileNo, orderpeymnt.OrderNo, CustomerOrderId.Value);
                    return Ok("success");
                }
                else
                {

                    orderpeymnt.FinalStatusId = result.code;
                    orderpeymnt.TransactionDate = timeTick;
                    _repository.CustomerOrderPayment.Update(orderpeymnt);
                    _repository.Save();
                    return Ok("error");
                }


            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside GetCustomerOrderListByCustomerId: {e.Message}");
                return BadRequest("Internal server error");
            }
        }
    }
}
