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


        [HttpPut]
        [Route("CustomerOrder/FinalOrderInsert")]
        public IActionResult FinalOrderInsert(long customerOrderId, long postTypeId, long paymentTypeId, string customerDescription, string offerCode)
        {
            try
            {


                var _costumerOrderProduct = _repository.CustomerOrderProduct
                    .FindByCondition(c => c.CustomerOrderId.Equals(customerOrderId)).ToList();
                _costumerOrderProduct.ForEach(c =>
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

                var _costumerOrder = _repository.CustomerOrder.FindByCondition(c => c.Id.Equals(customerOrderId)).FirstOrDefault();
                _costumerOrder.PaymentTypeId = paymentTypeId;
                _costumerOrder.PostTypeId = postTypeId;
                _costumerOrder.CustomerDescription = customerDescription;
                _costumerOrder.CustomerOrderProduct = _costumerOrderProduct;

                _costumerOrder.Weight = _costumerOrderProduct.Sum(c => (c.Weight * c.OrderCount));
                _costumerOrder.TaxValue = 9;
                _costumerOrder.OrderPrice = _costumerOrderProduct.Sum(c => (c.OrderCount * c.ProductPrice));
                _costumerOrder.TaxPrice = (long?)_costumerOrderProduct.Sum(c => ((c.ProductPrice * 0.09) * c.OrderCount));
                _costumerOrder.OfferValue = (int?)_repository.CustomerOffer
                    .FindByCondition(c =>
                        c.CustomerId == _costumerOrder.CustomerId && c.FromDate <= timeTick && timeTick <= c.ToDate &&
                        c.OfferCode == offerCode).Select(x => x.Value).DefaultIfEmpty(0).FirstOrDefault();
                _costumerOrder.OfferPrice = (_costumerOrder.OrderPrice + _costumerOrder.TaxPrice) *
                                            (_costumerOrder.OfferValue / 100);
                _costumerOrder.OrderPrice =
                    _costumerOrder.CustomerOrderProduct.Where(c => c.Ddate.Equals(null)).Sum(c => (c.ProductPrice * c.OrderCount));
                _costumerOrder.PostPrice = _repository.PostType.FindByCondition(c => c.Rkey.Equals(postTypeId))
                    .Select(c => c.Price).DefaultIfEmpty(0).FirstOrDefault();
                _costumerOrder.FinalPrice =
                    (_costumerOrder.OrderPrice + _costumerOrder.TaxPrice + _costumerOrder.PostPrice) - _costumerOrder.OfferPrice;

                _repository.CustomerOrder.Update(_costumerOrder);
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
