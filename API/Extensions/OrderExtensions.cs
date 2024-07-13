using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public  static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order>query)
        {
            return query
                 .Select(order => new OrderDto
                 {
                    Id=order.Id,
                    BUyerId=order.BUyerId,
                    OrderData=order.OrderData,
                    ShippingAddress = order.ShippingAddress,
                    Subtotal= order.Subtotal,
                    OrderStatus=order.OrderStatus.ToString(),
                    Total=order.GetTotal(),
                    OrderItems=order.OrderItems.Select(item=>new OrderItemDto
                    {
                        ProductId=item.ItemOrdered.ProductId,
                        Name=item.ItemOrdered.Ime,
                        Slika=item.ItemOrdered.Slika,
                        Cijena=item.Cijena.ToString(),////////
                        Kolicina= item.Kolicina
                    }).ToList()

                 }).AsNoTracking();
        }
    }
}