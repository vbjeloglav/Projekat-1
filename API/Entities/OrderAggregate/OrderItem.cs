using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        public int OrderId { get; set; }
        public long Cijena { get; set; }
        public int Kolicina { get; set; }   
        public bool Returned { get; set; }
    }
}