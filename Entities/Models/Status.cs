using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Status
    {
        public Status()
        {
            Customer = new HashSet<Customer>();
            Product = new HashSet<Product>();
            Seller = new HashSet<Seller>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long? Rkey { get; set; }
        public long? NextStatusId { get; set; }
        public string Color { get; set; }
        public long? StatusTypeId { get; set; }
        public long? CatStatusId { get; set; }
        public long? CuserId { get; set; }
        public long? Cdate { get; set; }
        public long? DuserId { get; set; }
        public long? Ddate { get; set; }
        public long? MuserId { get; set; }
        public long? Mdate { get; set; }
        public long? DaUserId { get; set; }
        public long? DaDate { get; set; }

        public virtual CatStatus CatStatus { get; set; }
        public virtual StatusType StatusType { get; set; }
        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Product> Product { get; set; }
        public virtual ICollection<Seller> Seller { get; set; }
    }
}
