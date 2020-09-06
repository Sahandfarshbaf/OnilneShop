﻿using System;
using System.Collections.Generic;
using System.Text;
using Entities.Models;

namespace Contracts
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        List<Product> GetSellerProductList(long sellerId);
    }
}
