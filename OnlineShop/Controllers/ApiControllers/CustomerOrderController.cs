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
using Microsoft.EntityFrameworkCore;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class CustomerOrderController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        
        private readonly long timeTick;

        public CustomerOrderController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            // userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            timeTick = DateTime.Now.Ticks;

        }


        [HttpPost]
        [Route("CustomerOrder/InsertCustomerOrder")]
        public IActionResult InsertCustomerOrder(List<CustomerOrderProduct> customerOrderProductlist)
        {
            try
            {
                CustomerOrder customerOrder = new CustomerOrder();
                var userid= User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
                var _customerId = _repository.Customer.FindByCondition(s => s.UserId.Equals(userid)).Select(c => c.Id).FirstOrDefault();

                customerOrder.CuserId = userid;
                customerOrder.Cdate = timeTick;
                customerOrder.CustomerId = _customerId;
                customerOrder.OrderDate = timeTick;
                customerOrder.OrderNo = timeTick;
                customerOrder.CustomerId = _customerId;


                customerOrderProductlist.ForEach(x =>
                {
                    x.Cdate = timeTick;
                    x.CuserId = userid;

                });

                customerOrder.CustomerOrderProduct = customerOrderProductlist;

                _repository.CustomerOrder.Create(customerOrder);
                _repository.Save();
                _logger.LogInfo($"InsertCustomerOrder To database.");
                return Ok(customerOrder.Id);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside InsertCustomerOrder  To database: {e.Message}");
                return BadRequest("Internal server error");
            }

        }


        [HttpPut]
        [Route("CustomerOrder/FinalOrderInsert")]
        public IActionResult FinalOrderInsert(long customerOrderId, long postTypeId, long paymentTypeId, string customerDescription, string offerCode)
        {
            try
            {


                var custumerOrderProduct =
                    _repository.CustomerOrderProduct.GetCustomerOrderProductFullInfoByCustomerOrderId(customerOrderId);


                custumerOrderProduct.ForEach(c =>
                {
                    c.ProductPrice = c.Product.Price;
                    c.ProductOfferValue = c.Product.ProductOffer
                        .Where(x => x.FromDate <= timeTick && timeTick <= x.ToDate).Select(x => x.Value)
                        .DefaultIfEmpty(0).FirstOrDefault();
                    c.ProductOfferCode = c.Product.ProductOffer
                        .Where(x => x.FromDate <= timeTick && timeTick <= x.ToDate).Select(x => x.OfferCode)
                        .FirstOrDefault();
                    c.ProductOfferPrice = (long?)(c.ProductPrice - ((c.ProductOfferValue / 100) * c.ProductPrice));
                    c.Weight = c.Product.Weight;
                    c.ProductCode = c.Product.Coding;
                });

                var custumerOrder = _repository.CustomerOrder.FindByCondition(c => c.Id.Equals(customerOrderId)).FirstOrDefault();
                var costomerId = custumerOrder.CustomerId.Value;
                custumerOrder.PaymentTypeId = paymentTypeId;
                custumerOrder.PostTypeId = postTypeId;
                custumerOrder.CustomerDescription = customerDescription;
                custumerOrder.CustomerOrderProduct = custumerOrderProduct;

                custumerOrder.Weight = custumerOrderProduct.Sum(c => (c.Weight * c.OrderCount));
                custumerOrder.TaxValue = 9;
                custumerOrder.OrderPrice = custumerOrderProduct.Sum(c => (c.OrderCount * c.ProductPrice));
                custumerOrder.TaxPrice = (long?)custumerOrderProduct.Sum(c => ((c.ProductPrice * 0.09) * c.OrderCount));


                var a = _repository.CustomerOffer
                    .FindByCondition(c => c.CustomerId == costomerId && c.FromDate <= timeTick && timeTick <= c.ToDate)
                    .FirstOrDefault();
                custumerOrder.OfferValue = a != null ? (int?)a.Value : 0;

                custumerOrder.OfferPrice = (custumerOrder.OrderPrice + custumerOrder.TaxPrice) *
                                           (custumerOrder.OfferValue / 100);
                custumerOrder.OrderPrice =
                    custumerOrder.CustomerOrderProduct.Where(c => c.Ddate.Equals(null)).Sum(c => (c.ProductPrice * c.OrderCount));
                var b = _repository.PostType.FindByCondition(c => c.Rkey.Equals(postTypeId)).FirstOrDefault();
                custumerOrder.PostPrice = b != null ? b.Price : 0;




                custumerOrder.FinalPrice =
                    (custumerOrder.OrderPrice + custumerOrder.TaxPrice + custumerOrder.PostPrice) - custumerOrder.OfferPrice;

                _repository.CustomerOrder.Update(custumerOrder);
                _repository.Save();
                return Ok("");
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside FinalOrderInsert  To database: {e.Message}");
                return BadRequest("Internal server error");
            }
        }

    }
}
