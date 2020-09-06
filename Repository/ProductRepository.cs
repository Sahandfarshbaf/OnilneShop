using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
   public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            
        }
        public List<Product> GetProductWithRateAndOffer()
        {
            return FindAll()
                .Include(p=>p.ProductOffer)
                .Include(p => p.ProductCustomerRate)
                .ToList();
        }

        public List<Product> GetSellerProductList(long sellerId)
        {
            return FindByCondition(p=>p.SellerId.Equals(sellerId))
                .Include(p => p.CatProduct.Name)
                .OrderByDescending(p=>p.Id)
                .ToList();
        }
    }
}
