using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        public readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x=>x.BUyerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name ="GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x=>x.BUyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.BasketOprema
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

                if(basket == null) return BadRequest(new ProblemDetails{Title="Korpa nije pronadjena"});
                var items = new List<OrderItem>();

                foreach (var item in basket.Items)
                {
                    var productItem = await _context.Oprema.FindAsync(item.ProductId);
                    var ItemOrdered = new ProductItemOrdered
                    {
                        ProductId=productItem.Id,
                        Ime=productItem.Ime,
                        Slika=productItem.Slika
                    };
                    var OrderItem = new OrderItem
                    {
                        ItemOrdered=ItemOrdered,
                        Cijena=productItem.Cijena,
                        Kolicina= item.Quantity
                    };
                    items.Add(OrderItem);
                    productItem.KolicinaNaStanju -= item.Quantity;                
                }
                var subtotal= items.Sum(item =>item.Cijena*item.Kolicina);
                
                var order = new Order
                {
                    OrderItems=items,
                    BUyerId=User.Identity.Name,
                    ShippingAddress=orderDto.ShippingAddress,
                    Subtotal= subtotal,
                    PaymentIntentId= basket.PaymentIntentId,
                    


                };

                _context.Orders.Add(order);
                _context.BasketOprema.Remove(basket);
                

                if(orderDto.SaveAddress)
                {
                    var user = await _context.Users
                        .Include(a=>a.Address)
                        .FirstOrDefaultAsync(x=>x.UserName== User.Identity.Name);
                        
                    var address = new UserAddress
                    {
                        FullName = orderDto.ShippingAddress.FullName,
                        Address1 = orderDto.ShippingAddress.Address1,
                        Address2 = orderDto.ShippingAddress.Address2,
                        City = orderDto.ShippingAddress.City,
                        State = orderDto.ShippingAddress.State,
                        Zip = orderDto.ShippingAddress.Zip,
                        

                    };
                    user.Address = address;
                 
                }
                var result = await _context.SaveChangesAsync()>0;

                if(result) return CreatedAtRoute("GetOrder",new {id = order.Id},order.Id);

                return BadRequest("Promlem prilikom kreiranja");
        }

       


      [HttpGet("AllOrders")]
        public async Task<ActionResult<List<OrderDto>>> GetOrdersAll()
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .ToListAsync();
        }
        
    

    }
       
}
