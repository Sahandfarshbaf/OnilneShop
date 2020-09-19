using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private long timeTick;

        public SellerController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper, long timeTick)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            this.timeTick = timeTick;
        }

        [HttpGet]
        [Route("Seller/GetLastestSellerList")]
        public IActionResult GetLastestSellerList()
        {
            try
            {
                var result = _repository.Seller.FindAll().OrderByDescending(c => c.Cdate).Take(10).ToList();
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside GetLastestCustomerList: {e.Message}");
                return BadRequest("Internal server error");
            }
        }
    }




  
}
