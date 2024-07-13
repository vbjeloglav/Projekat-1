using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Filter (this IQueryable<Product> query, string kategorijaa)
        {
            var kategorijaList= new List<string>();
            if(!string.IsNullOrEmpty(kategorijaa))
                kategorijaList.AddRange(kategorijaa.ToLower().Split(",").ToList());
            query = query.Where(p=>kategorijaList.Count==0 || kategorijaList.Contains(p.Kategorija.ToLower()));
                return query;
        }
    }
}