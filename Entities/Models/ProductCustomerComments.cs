using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class ProductCustomerComments
    {
        public long Id { get; set; }
        public long? ProductId { get; set; }
        public long? CustomerId { get; set; }
        public long? CommentDate { get; set; }
        public long? CommentDesc { get; set; }
        public int? LikeCount { get; set; }
        public int? DislikeCount { get; set; }
        public long? CuserId { get; set; }
        public long? Cdate { get; set; }
        public long? DuserId { get; set; }
        public long? Ddate { get; set; }
        public long? MuserId { get; set; }
        public long? Mdate { get; set; }
        public long? DaUserId { get; set; }
        public long? DaDate { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
    }
}
