using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class CustomerOrderController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private string userid;
        private long timeTick;

        public CustomerOrderController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            timeTick = DateTime.Now.Ticks;

        }


        [HttpPost]
        [Route("CustomerOrder/InsertCustomerOrder")]
        public IActionResult InsertCustomerOrder(CustomerOrder customerOrder)
        {
            try
            {
                var _customerId = _repository.Customer.FindByCondition(s => s.UserId.Equals(userid)).Select(c => c.Id).FirstOrDefault();

                customerOrder.CuserId = userid;
                customerOrder.Cdate = timeTick;
                customerOrder.CustomerId = _customerId;
                customerOrder.OrderDate = timeTick;
                customerOrder.OrderNo = timeTick;
                var customerOrderProductList = customerOrder.CustomerOrderProduct.ToList();
                customerOrderProductList.ForEach(x =>
                {
                    x.Cdate = timeTick;
                    x.CuserId = userid;
                    x.Weight = x.Product.Weight;
                    x.ProductCode = x.Product.Coding;
                });

                customerOrder.CustomerOrderProduct = customerOrderProductList;

                _repository.CustomerOrder.Create(customerOrder);
                _logger.LogInfo($"InsertCustomerOrder To database.");
                return Ok("");
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside InsertCustomerOrder  To database: {e.Message}");
                return BadRequest("Internal server error");
            }

        }

    }
}
