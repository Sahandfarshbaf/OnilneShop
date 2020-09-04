﻿using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class SellerCatProduct
    {
        public long Id { get; set; }
        public long? SellerId { get; set; }
        public long? CatProductId { get; set; }
        public string CuserId { get; set; }
        public long? Cdate { get; set; }
        public string DuserId { get; set; }
        public long? Ddate { get; set; }
        public string MuserId { get; set; }
        public long? Mdate { get; set; }
        public string DaUserId { get; set; }
        public long? DaDate { get; set; }

        public virtual CatProduct CatProduct { get; set; }
        public virtual Seller Seller { get; set; }
    }
}
