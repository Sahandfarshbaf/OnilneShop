using System;
using System.Collections.Generic;
using System.Text;
using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private ICatProductRepository _catProduct;
        private IProductRepository _product;
        private ISellerRepository _seller;
        private IProductImageRepository _productImage;
        private IColorRepository _color;
        private IProductMeterRepository _productMeter;


        public ICatProductRepository CatProduct
        {
            get
            {
                if (_catProduct == null)
                {
                    _catProduct = new CatProductRepository(_repoContext);
                }

                return _catProduct;
            }
        }
        public IProductRepository Product
        {
            get
            {
                if (_product == null)
                {
                    _product = new ProductRepository(_repoContext);
                }

                return _product;
            }
        }
        public ISellerRepository Seller
        {
            get
            {
                if (_seller == null)
                {
                    _seller = new SellerRepository(_repoContext);
                }

                return _seller;
            }
        } 
        public IProductImageRepository ProductImage
        {
            get
            {
                if (_productImage == null)
                {
                    _productImage = new ProductImageRepository(_repoContext);
                }

                return _productImage;
            }
        }
        public IColorRepository Color
        {
            get
            {
                if (_color == null)
                {
                    _color = new ColorRepository(_repoContext);
                }

                return _color;
            }
        }

        public IProductMeterRepository ProductMeter
        {
            get
            {
                if (_productMeter == null)
                {
                    _productMeter = new ProductMeterRepository(_repoContext);
                }

                return _productMeter;
            }
        }

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
            
        }

        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
