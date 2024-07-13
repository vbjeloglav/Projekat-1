using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {
      
    
        public int Id { get; set; }
        public string BUyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderData { get; set; } = DateTime.Now;
        public List<OrderItemDto> OrderItems{ get; set; }
        public long Subtotal { get; set; }
        public string OrderStatus { get; set; }

        public long Total { get; set; }

    }
}