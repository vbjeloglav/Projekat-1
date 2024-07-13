using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id {get; set;}
        public string Ime {get; set;}
        public string Kategorija  {get; set;}
        public string Opis {get; set;}
        public string Slika {get; set;}
        public int KolicinaNaStanju {get; set;}
       
        public long Cijena {get; set;}
        public string Karakteristike {get; set;}
        public string Velicina {get; set;}
        public string PublicId {get; set;}
    }
}