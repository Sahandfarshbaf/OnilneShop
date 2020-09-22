using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AutoMapper;
using Entities.BusinessModel;
using Entities.DataTransferObjects;
using Entities.Models;
using Synapse.Tools;

namespace OnlineShop
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegistrationModel, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));

            CreateMap<ProductImage, ProductImageDto>()
                .ForMember(u => u.ProductImageId, opt => opt.MapFrom(x => x.Id));
            CreateMap<Product, ProductDto>()
                .ForMember(u => u.CatProductName, opt => opt.MapFrom(x => x.CatProduct.Name));
            CreateMap<Product, ProductByOfferRate>()
                .ForMember(u => u.CatProductName, opt => opt.MapFrom(x => x.CatProduct.Name))
                .ForMember(u => u.Rate, opt => opt.MapFrom(x => x.ProductCustomerRate.Average(r => r.Rate)))
                .ForMember(u => u.OfferValue, opt => opt.MapFrom(x => x.ProductOffer.FirstOrDefault(c => (c.FromDate <= DateTime.Now.Ticks) && (DateTime.Now.Ticks <= c.ToDate)).Value))
                .ForMember(u => u.PriceAfterOffer, opt => opt.MapFrom(x => x.Price - (x.ProductOffer.Where(c => (c.FromDate <= DateTime.Now.Ticks) && (DateTime.Now.Ticks <= c.ToDate)).Select(c => c.Value).DefaultIfEmpty(0).FirstOrDefault() / 100) * x.Price));

            CreateMap<CustomerOrder, CustomerOrderListDto>()
                .ForMember(u => u.OrderPrice, opt => opt.MapFrom(x => x.FinalPrice))
                .ForMember(u => u.OrderDate, opt => opt.MapFrom(x => DateTimeFunc.TimeTickToShamsi(x.OrderDate.Value)))
                .ForMember(u => u.ProductCount, opt => opt.MapFrom(x => x.CustomerOrderProduct.Count))
                .ForMember(u => u.PaymentStatus,
                    opt => opt.MapFrom(x =>
                        x.CustomerOrderPayment.OrderByDescending(c => c.TransactionDate).Select(c => c.FinalStatusId)
                            .DefaultIfEmpty(0).FirstOrDefault() == 100
                            ? "پرداخت موفق"
                            : "پرداخت ناموفق"));


            CreateMap<CustomerOrderProduct, CustomerOrderProductDto>()
                .ForMember(u => u.CustomerOrderProductId, opt => opt.MapFrom(x => x.Id))
                .ForMember(u => u.CoverImageUrl, opt => opt.MapFrom(x => x.Product.CoverImageUrl))
                .ForMember(u => u.SellerName,
                    opt => opt.MapFrom(x => x.Product.Seller.Name + " " + x.Product.Seller.Fname));




        }
    }
}
