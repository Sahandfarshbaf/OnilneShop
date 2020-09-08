﻿using System;
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
        IProductCustomerRateRepositry ProductCustomerRate { get; }
        IProductParametersRepository ProductParameters { get; }
        ISellerCatProductRepository SellerCatProduct { get; }
        IStatusRepository Status { get; }
        IStatusTypeRepository StatusType { get; }
        ISystemsRepository Systems { get; }
        ITablesRepository Tables { get; }
        ICatProductParametersRepository CatProductParameters { get; }
        ISliderPlaceTypeRepository SliderPlaceType { get; }
        ISliderRepository Slider { get; }



        void Save();
    }
}