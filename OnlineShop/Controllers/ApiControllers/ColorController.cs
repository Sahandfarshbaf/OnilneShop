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
    public class ColorController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public ColorController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Color/GetColorList")]
        public IActionResult GetColorList() {

            try
            {
                var result = _repository.Color.FindAll()
                                            .Where(c => string.IsNullOrWhiteSpace(c.DaUserId) && string.IsNullOrWhiteSpace(c.DuserId))
                                            .Select(p => new { p.Id, p.Name }).ToList();
                _logger.LogInfo($"Returned all Color from database.");
                return Ok(result);
            }
            catch (Exception e)
            {

                _logger.LogError($"Something went wrong inside GetColorList action: {e.Message}");
                return BadRequest("Internal server error");
            }
        
        }
    }
}
