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
    public class ProductMeterController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private string userid;
        private long timeTick;

        public ProductMeterController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            //userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            timeTick = DateTime.Now.Ticks;
        }
        [HttpGet]
        [Route("ProductMeter/GetProductMeterList")]
        public IActionResult GetProductMeterList()
        {

            try
            {
                var result = _repository.ProductMeter.FindByCondition(c => !string.IsNullOrWhiteSpace(c.DaUserId) && !string.IsNullOrWhiteSpace(c.DuserId)).Select(p => new { p.Id, p.Name }).ToList();
                _logger.LogInfo($"All ProductMeter List Returned");
                return Ok(result);

            }
            catch (Exception e)
            {

                _logger.LogError($"Something went in Action GetProductMeterList : {e.Message}");
                return BadRequest("Internal server error");
            }

        }
    }
}
