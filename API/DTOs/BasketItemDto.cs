using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Ime { get; set; }
        public long Cijena { get; set; }
        public string Slika { get; set; }
        public int Kolicina { get; set; }
         public DateOnly DatumIznajmljivanja { get; set; } = new DateOnly();
          public DateOnly DatumVracanja { get; set; }
        
    }
}