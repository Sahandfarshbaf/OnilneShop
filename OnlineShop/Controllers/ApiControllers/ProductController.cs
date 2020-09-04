using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Synapse.Tools;

namespace OnlineShop.Controllers.ApiControllers
{
    [Route("api/")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private ILoggerManager _logger;
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private string userid;
        private long timeTick;

        public ProductController(ILoggerManager logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
            userid = User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).SingleOrDefault();
            timeTick = DateTime.Now.Ticks;

        }

        [HttpPost]
        [Route("Product/Insert")]
        public IActionResult Insert(Product _product)
        {
            var coverImageUrl = HttpContext.Request.Form.Files[0];

            FileManeger.UploadFileStatus uploadFileStatus = FileManeger.FileUploader(coverImageUrl, 1, "ProductImages");

            if (uploadFileStatus.Status == 200)
            {
                _product.CoverImageUrl = uploadFileStatus.Path;
                _product.SellerId = _repository.Seller.FindByCondition(c => c.UserId == userid).FirstOrDefault().Id;
                _product.CuserId = userid;
                _product.Cdate = timeTick;
                _repository.Product.Create(_product);

                try
                {
                    _repository.Save();
                    _logger.LogInfo($"Insert Product To database.");
                    return Ok("");
                }
                catch (Exception e)
                {
                    _logger.LogError($"Something went wrong inside Insert Product To database: {e.Message}");
                    FileManeger.FileRemover(new List<string> { uploadFileStatus.Path });
                    return BadRequest(e.Message.ToString());
                }

            }
            else
            {

                _logger.LogError($"Something went wrong Insert Product To database: {uploadFileStatus.Path}");
                return BadRequest(uploadFileStatus.Path);
            }


        }
    }
}
