using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public LocationController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("Location/GetCountryList")]
        public IActionResult GetCountryList()
        {
            var countrylist = _repository.Location.GetCountryList().ToList();
            _logger.LogInfo($"Returned all GetCountryList from database.");
            return Ok(countrylist);
        }

        [HttpGet]
        [Route("Location/GetProvinceList")]
        public IActionResult GetProvinceList(long? countryId)
        {
            var provincelist = _repository.Location.GetProvinceList(countryId).ToList();
            _logger.LogInfo($"Returned all GetProvinceList from database.");
            return Ok(provincelist);
        }

        [HttpGet]
        [Route("Location/GetCityList")]
        public IActionResult GetCityList(long provinceId)
        {
            var citylist = _repository.Location.GetCityList(provinceId).ToList();
            _logger.LogInfo($"Returned all GetCityList from database.");
            return Ok(citylist);
        }
    }
}
