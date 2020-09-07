﻿using System;
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


        }
    }
}
