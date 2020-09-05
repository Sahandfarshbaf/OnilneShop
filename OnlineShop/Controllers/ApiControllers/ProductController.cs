using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
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
        [Route("Product/InsertProduct")]
        public IActionResult InsertProduct()
        {
            Product _product = JsonSerializer.Deserialize<Product>(HttpContext.Request.Form["Product"]);
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
                return BadRequest("Internal server error");
            }


        }

        [HttpPut]
        [Route("Product/EditProduct")]
        public IActionResult EditProduct(long productId)
        {


            Product _product = JsonSerializer.Deserialize<Product>(HttpContext.Request.Form["Product"]);
            var product = _repository.Product.FindByCondition(c => c.Id.Equals(productId)).FirstOrDefault();
            if (product == null)
            {
                _logger.LogError($"Product with id: {productId}, hasn't been found in db.");
                return NotFound();
            }

            if (HttpContext.Request.Form.Files.Count > 0)
            {
                var coverImageUrl = HttpContext.Request.Form.Files[0];
                var deletedFile = product.CoverImageUrl;
                FileManeger.UploadFileStatus uploadFileStatus = FileManeger.FileUploader(coverImageUrl, 1, "ProductImages");
                if (uploadFileStatus.Status == 200)
                {

                    product.Name = _product.Name;
                    product.EnName = _product.EnName;
                    product.CatProductId = _product.CatProductId;
                    product.Coding = _product.Coding;
                    product.Price = _product.Price;
                    product.FirstCount = _product.FirstCount;
                    product.ProductMeterId = _product.ProductMeterId;
                    product.CoverImageUrl = uploadFileStatus.Path;
                    _repository.Product.Update(product);
                    try
                    {
                        _repository.Save();
                        FileManeger.FileRemover(new List<string> { deletedFile });
                        _logger.LogInfo($"Update Product In database ById={productId}");
                        return Ok("");
                    }
                    catch (Exception e)
                    {

                        _logger.LogError($"Something went wrong Update Product To database: {e.Message}");
                        FileManeger.FileRemover(new List<string> { uploadFileStatus.Path });
                        return BadRequest("Internal server error");
                    }

                }
                else
                {
                    _logger.LogError($"Something went wrong Update Product To database: {uploadFileStatus.Path}");
                    return BadRequest("Internal server error");
                }
            }
            else
            {

                product.Name = _product.Name;
                product.EnName = _product.EnName;
                product.CatProductId = _product.CatProductId;
                product.Coding = _product.Coding;
                product.Price = _product.Price;
                product.FirstCount = _product.FirstCount;
                product.ProductMeterId = _product.ProductMeterId;
                _repository.Product.Update(product);
                try
                {
                    _repository.Save();
                    _logger.LogInfo($"Update Product In database ById={productId}");
                    return Ok("");
                }
                catch (Exception e)
                {

                    _logger.LogError($"Something went wrong Update Product To database: {e.Message}");
                    return BadRequest("Internal server error");
                }


            }


        }

        [HttpDelete]
        [Route("Product/DeleteProduct")]
        public IActionResult DeleteProduct(long productId) {

            try
            {
                var product=_repository.Product.FindByCondition(c => c.Id.Equals(productId)).FirstOrDefault();
                if (product == null) {
                    _logger.LogError($"Product with id: {productId}, hasn't been found in db.");
                    return NotFound();

                }
                product.Ddate = timeTick;
                product.DuserId = userid;
                _repository.Product.Update(product);
                _repository.Save();
                _logger.LogInfo($"Delete Product In database ById={productId}");
                return Ok("");


            }
            catch (Exception e)
            {

                _logger.LogError($"Something went wrong Delete Product To database: {e.Message}");
                return BadRequest("Internal server error");
            }
        }
    }
}
