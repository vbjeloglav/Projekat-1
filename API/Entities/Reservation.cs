using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggregate;

namespace API.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
       //  public OrderStatus OrderStatus { get; set; } = OrderStatus.Rezervisano;
        public DateTime ReservedFrom { get; set; }
        public DateTime ReservedTo { get; set; }
    }
}