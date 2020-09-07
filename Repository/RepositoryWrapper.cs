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
        private IProductOfferRepository _productOffer;
        private IProductCustomerCommentsRepository _productCustmerComments;
        private IProductCustomerRateRepositry _productCustomerRate;
        private IProductParametersRepository _productParameters;
        private ISellerCatProductRepository _sellerCatProduct;
        private IStatusRepository _status;
        private IStatusTypeRepository _statusType;
        private ISystemsRepository _systems;
        private ITablesRepository _tables;
        private ICatProductParametersRepository _catProductParameters;



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
        public IProductOfferRepository ProductOffer
        {
            get
            {
                if (_productOffer == null)
                {
                    _productOffer = new ProductOfferRepository(_repoContext);
                }

                return _productOffer;
            }
        }
        public IProductCustomerCommentsRepository ProductCustomerComments
        {
            get
            {
                if (_productCustmerComments == null)
                {
                    _productCustmerComments = new ProductCustomerCommentsRepository(_repoContext);
                }

                return _productCustmerComments;
            }
        }
        public IProductCustomerRateRepositry ProductCustomerRate
        {
            get
            {
                if (_productCustomerRate == null)
                {
                    _productCustomerRate = new ProductCustomerRateRepository(_repoContext);
                }

                return _productCustomerRate;
            }
        }
        public IProductParametersRepository ProductParameters
        {
            get
            {
                if (_productParameters == null)
                {
                    _productParameters = new ProductParametersRepository(_repoContext);
                }

                return _productParameters;
            }
        }
        public ISellerCatProductRepository SellerCatProduct
        {
            get
            {
                if (_sellerCatProduct == null)
                {
                    _sellerCatProduct = new SellerCatProductRepository(_repoContext);
                }

                return _sellerCatProduct;
            }
        }
        public IStatusRepository Status
        {
            get
            {
                if (_status == null)
                {
                    _status = new StatusRepository(_repoContext);
                }

                return _status;
            }
        }
        public IStatusTypeRepository StatusType
        {
            get
            {
                if (_statusType == null)
                {
                    _statusType = new StatusTypeRepository(_repoContext);
                }

                return _statusType;
            }
        }
        public ISystemsRepository Systems
        {
            get
            {
                if (_systems == null)
                {
                    _systems = new SystemsRepository(_repoContext);
                }

                return _systems;
            }
        }
        public ITablesRepository Tables
        {
            get
            {
                if (_tables == null)
                {
                    _tables = new TablesRepository(_repoContext);
                }

                return _tables;
            }
        }
        public ICatProductParametersRepository CatProductParameters
        {
            get
            {
                if (_catProductParameters == null)
                {
                    _catProductParameters = new CatProductParametersRepository(_repoContext);
                }

                return _catProductParameters;
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
