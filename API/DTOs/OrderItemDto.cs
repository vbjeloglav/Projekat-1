using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Slika { get; set; }
        public string Cijena { get; set; }
        public int Kolicina { get; set; }

    }
}