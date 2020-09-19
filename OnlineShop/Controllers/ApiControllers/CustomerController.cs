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
    public class CustomerController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private string userid;
        private long timeTick;

        public CustomerController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper, string userid, long timeTick)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            this.userid = userid;
            this.timeTick = DateTime.Now.Ticks;
        }


        [HttpGet]
        [Route("Customer/GetLastestCustomerList")]
        public IActionResult GetLastestCustomerList()
        {
            try
            {
               var result= _repository.Customer.FindAll().OrderByDescending(c => c.Cdate).Take(10).ToList();
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
