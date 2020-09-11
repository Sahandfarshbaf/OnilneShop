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
    public class PostTypeController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private string userid;
        private long timeTick;

        public PostTypeController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            //userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            timeTick = DateTime.Now.Ticks;
        }

        [HttpGet]
        [Route("PostType/GetPostTypeList")]
        public IActionResult GetPostTypeList()
        {
            try
            {
                var result = _repository.PostType.FindByCondition(c => c.DaUserId.Equals(null) && c.DuserId.Equals(null))
                    .Select(c => new { c.Id, c.Title, c.Icon, c.Description, c.Price }).ToList();
                _logger.LogInfo($"Returned PostType List");
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside GetPostTypeList action: {e.Message}");
                return BadRequest("Internal server error");
            }

        }
    }
}
