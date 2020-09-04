using System;
using System.Collections.Generic;

namespace Entities.Models
{
    public partial class Tables
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long? SystemId { get; set; }
        public long? CatStatusId { get; set; }
        public long? TableCode { get; set; }
        public long? CuserId { get; set; }
        public long? Cdate { get; set; }
        public long? DuserId { get; set; }
        public long? Ddate { get; set; }
        public long? MuserId { get; set; }
        public long? Mdate { get; set; }
        public long? DaUserId { get; set; }
        public long? DaDate { get; set; }

        public virtual CatStatus CatStatus { get; set; }
        public virtual Systems System { get; set; }
    }
}
