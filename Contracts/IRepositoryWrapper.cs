using System;
using System.Collections.Generic;
using System.Text;


namespace Contracts
{
    public interface IRepositoryWrapper
    {
        ICatProductRepository CatProduct { get; }
        IProductRepository Product { get; }
        ISellerRepository Seller { get; }
        IProductImageRepository ProductImage { get; }
        IColorRepository Color { get; }
        IProductMeterRepository ProductMeter { get; }
        IProductOfferRepository ProductOffer { get; }
        IProductCustomerCommentsRepository ProductCustomerComments { get; }



        void Save();
    }
}