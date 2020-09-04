using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private string userid;
        private long timeTick;
        public ProductImageController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            //userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            timeTick = DateTime.Now.Ticks;
        }

        [HttpGet]
        [Route("ProductImage/GetImageList")]
        public IActionResult GetImageList(long productId)
        {
            try
            {
                var imagelist = _repository.ProductImage.GetProductImageWithDetails(productId).ToList();
                if (imagelist.Count == 0)
                {
                    _logger.LogError($"ProductImage with id: {productId}, hasn't been found in db.");
                    return NotFound();
                }

                var imagelistResult = _mapper.Map<List<ProductImageDto>>(imagelist);
                _logger.LogInfo($"Returned ImageList with id: {productId}");
                return Ok(imagelistResult);
            }
            catch (Exception e)
            {
                _logger.LogError($"Something went wrong inside GetImageList action: {e.Message}");
                return BadRequest("Internal server error");
            }

        }
    }
}
