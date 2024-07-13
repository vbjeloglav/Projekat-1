using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ClosedController : BaseApiController
    {
          private readonly StoreContext _context;
        public ClosedController(StoreContext context)
        {
            _context = context;
        }
        

        [HttpPut("orders/items/return")]
        public async Task<ActionResult> ReturnOrderedItem(int orderId, int itemId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound("Narudžba nije pronađena.");
            }

            var orderItem = order.OrderItems.FirstOrDefault(oi => oi.ItemOrdered.ProductId == itemId);

            if (orderItem == null)
            {
                return NotFound("Stavka narudžbe nije pronađena.");
            }

            // Povećaj količinu na stanju za vraćenu količinu
            var product = await _context.Oprema.FindAsync(orderItem.ItemOrdered.ProductId);
            if (product != null)
            {
                product.KolicinaNaStanju += orderItem.Kolicina; // Povećaj količinu za vraćenu količinu
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Oprema je uspješno vraćena.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Greška prilikom ažuriranja opreme: {ex.Message}");
            }
        }

            }
        }
                

            