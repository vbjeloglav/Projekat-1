using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public string PaymentIntentId {get; set; }//najmera placanje
        public string ClientSecret { get; set; }//tajni klijent
        
        
    public void AddItem(Product product, int kolicina, DateOnly datumIznajmljivanja, DateOnly datumVracanja)
    {
        if(Items.All(item=>item.ProductId!=product.Id))
        {
            Items.Add(new BasketItem{Product=product, Quantity=kolicina, From=datumIznajmljivanja, To=datumVracanja});
        }
        var existingItem=Items.FirstOrDefault(item=>item.ProductId==product.Id);
        if(existingItem!=null) existingItem.Quantity+=kolicina;
    }

    public void RemoveItem(int productId, int kolicina)
    {
        var item=Items.FirstOrDefault(item=>item.ProductId==productId);
        if(item==null)return;
        item.Quantity-=kolicina;
        if(item.Quantity==0) Items.Remove(item);
    }

    }

}