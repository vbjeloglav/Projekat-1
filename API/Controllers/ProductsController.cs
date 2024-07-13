using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    
    public class ProductsController: BaseApiController
    
    { 
        private readonly  StoreContext _context;
        private readonly IMapper _mapper;
       // private readonly ImageService _imageService;
        public ProductsController(StoreContext context, IMapper mapper)
        {
          //  _imageService = imageService;
            _mapper = mapper;
            _context=context;
           
        }

      /*  [HttpGet]
       
         public async Task<ActionResult<List<Product>>> GetProducts()
        {
                return await _context.Oprema.ToListAsync();

            
        }
        */
        [HttpGet("{kategorija}")]
        public  IEnumerable<Product> GetProductKategory(string kategorija)
        {
        
         
         //var lowerCaseSearchTerm=searchTerm.Trim().ToLower();
          return _context.Oprema.Where((p) =>p.Kategorija == kategorija  ).ToList();
         
           
        }
        

        [HttpGet("{id}/products", Name ="GetProduct")]
       /*public Product  GetProductId(int id )
       {
        var product = _context.Oprema.FirstOrDefault((p)=>p.Id==id);
        if (product == null)
        {
          
        }
        return product;
       }*/
          // [HttpGet("{id}")] 
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product= await _context.Oprema.FindAsync(id);
            if(product == null) return NotFound();
            return product;
        } 

        [HttpGet ("filters")]
        public async Task<ActionResult<Product>> GetFilters()
        {
            var kategorijaa = await _context.Oprema.Select(p=>p.Kategorija).Distinct().ToListAsync();
            return Ok(new {kategorijaa});
        }

        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
        {

            var product = _mapper.Map<Product>(productDto);

          /* if(productDto.File != null)
            {
                var imageResult = await _imageSecreatervice.AddImageAsync(productDto.File);

                if(imageResult.Error != null) 
                    return BadRequest(new ProblemDetails{Title = imageResult.Error.Message});

                product.Slika = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }*/

            _context.Oprema.Add(product);

            var result = await _context.SaveChangesAsync()>0;
            if(result) return CreatedAtRoute("GetProduct",new {Id=product.Id}, product);
            return BadRequest(new ProblemDetails {Title ="Problem prilikom kreiranja novih proizvoda"});

        }

        [Authorize(Roles ="Admin")]
        [HttpPut]

        public async Task<ActionResult> UpdateProduct(UpdateProductDto productDto)
        {
            var product = await _context.Oprema.FindAsync(productDto.Id);

            if(product == null) return NotFound();

            _mapper.Map(productDto, product);
            var result = await _context.SaveChangesAsync()>0;
            if(result) return NoContent();
            return BadRequest(new ProblemDetails{Title="Problem prilikom ažuriranja proizvoda"});

        }


        [Authorize(Roles ="Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Oprema.FindAsync(id);
            if(product == null) return NotFound();
            _context.Oprema.Remove(product);
             var result = await _context.SaveChangesAsync()>0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem prilikom brisanja proizvoda"});



        }

        [HttpGet]
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = _context.Oprema.AsQueryable();
            var  products = await PageList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
           Response.AddPaginationHeader(products.MetaData);
            return products;
        }  


       
        
    }
}