using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController :BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet (Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>>GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();
            return basket.MapBasketToDto();
        }

       


        [HttpPost]
        public async Task<ActionResult<BasketDto>>AddItemToBasket(int productId, int kolicina, DateOnly datumIznajmljivanja, DateOnly datumVracanja )
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if(basket==null) basket=CreateBasket(); 
            var product=await _context.Oprema.FindAsync(productId);
            if(product==null) return NotFound();
            basket.AddItem(product, kolicina, datumIznajmljivanja, datumVracanja);
            var result=await _context.SaveChangesAsync()>0;
            if(result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());
            return BadRequest(new ProblemDetails{Title="Problem prilikom cuvanja stavki u korpu!"});
        }

        

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int kolicina)
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if(basket==null) return NotFound();
            basket.RemoveItem(productId, kolicina);
            var result=await _context.SaveChangesAsync()>0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem prilikom uklanjanja stavki iz korpe!"});
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.BasketOprema
                            .Include(i => i.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            return User.Identity.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;
            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId=Guid.NewGuid().ToString();
                var cookieOptions= new CookieOptions{IsEssential=true, Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            
            var basket= new Basket{BuyerId=buyerId};
            _context.BasketOprema.Add(basket);
           return basket;
        }
        

        //rezervacija
          [HttpPost("reserve")]
    public async Task<ActionResult> ReserveBasketItems(ReservationDto reservationDto)
    {
        var buyerId = GetBuyerId();
        var basket = await RetrieveBasket(buyerId);
        if (basket == null || basket.Items.Count == 0)
        {
            return BadRequest(new ProblemDetails { Title = "Korpa je prazna ili nije pronađena." });
        }


        // Validacija rezervacije ovdje prema poslovnim pravilima (npr. datumi, dostupnost proizvoda, itd.)

        // Kreiranje rezervacije za svaki proizvod u korpi
        var reservations = new List<Reservation>();
        foreach (var item in basket.Items)
        {
            var reservation = new Reservation
            {
                ProductId = item.ProductId,
                CustomerName = reservationDto.CustomerName,
                CustomerEmail = reservationDto.ContactEmail,
               // OrderStatus= OrderStatus.Rezervisano,
                ReservedFrom = reservationDto.DatumIznajmljivanja,
                ReservedTo = reservationDto.DatumVracanja
                // Dodajte ostale potrebne informacije za rezervaciju
            };

            reservations.Add(reservation);
        }

        // Spremanje rezervacija u bazu podataka
        _context.RezervisanaOprema.AddRange(reservations);
        var result = await _context.SaveChangesAsync() > 0;

        if (result)
        {
            // Očisti korpu nakon uspješne rezervacije
            //basket.ClearItems();
          //  await _context.SaveChangesAsync();

            return Ok();
        }
        else
        {
            return BadRequest(new ProblemDetails { Title = "Problem prilikom spremanja rezervacija." });
        }
    }

    // ... Ostale pomoćne metode za rad s korisničkom košaricom
}
}

        
        
 