using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
namespace API.DTOs
{
    public class CreateProductDto
    {
       
         [Required]
        public string Ime {get; set;}
        [Required]
        public string Kategorija  {get; set;}
        [Required]
        public string Opis {get; set;}
       [Required]
        public IFormFile File {get; set;}
        [Required]
        [Range (0, 200)]
        public int KolicinaNaStanju {get; set;}
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Cijena {get; set;}
        [Required]
        public string Karakteristike {get; set;}
        [Required]
        public string Velicina {get; set;}
    
    }
}