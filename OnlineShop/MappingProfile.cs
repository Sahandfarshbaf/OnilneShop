using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Entities.BusinessModel;
using Entities.DataTransferObjects;
using Entities.Models;

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
                .ForMember(u=>u.Rate,opt=>opt.MapFrom(x => x.ProductCustomerRate.Average(r => r.Rate)))
                .ForMember(u => u.OfferValue, opt => opt.MapFrom(x => x.ProductOffer.FirstOrDefault(c => (c.FromDate <= DateTime.Now.Ticks) && (DateTime.Now.Ticks <= c.ToDate)).Value))
                .ForMember(u => u.PriceAfterOffer, opt => opt.MapFrom(x => x.Price - (x.ProductOffer.FirstOrDefault(c => (c.FromDate <= DateTime.Now.Ticks) && (DateTime.Now.Ticks <= c.ToDate)).Value / 100) * x.Price));



        }
    }
}
