using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
             return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret= basket.ClientSecret,
               

                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Ime = item.Product.Ime,
                    Cijena = item.Product.Cijena,
                    Slika = item.Product.Slika,
                    Kolicina = item.Quantity,
                    DatumIznajmljivanja=item.From,
                    DatumVracanja=item.To,


                   
                    
                }).ToList()
            };
            }

            public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket>query, string buyerId)
            {
                return query.Include(i=>i.Items).ThenInclude(p=>p.Product).Where(b=>b.BuyerId== buyerId);
            }
        
    }
}