﻿using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class OfferType
    {
        public OfferType()
        {
            Offers = new HashSet<Offers>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long? Rkey { get; set; }
        public long? CuserId { get; set; }
        public long? Cdate { get; set; }
        public long? DuserId { get; set; }
        public long? Ddate { get; set; }
        public long? MuserId { get; set; }
        public long? Mdate { get; set; }
        public long? DaUserId { get; set; }
        public long? DaDate { get; set; }

        public virtual ICollection<Offers> Offers { get; set; }
    }
}
