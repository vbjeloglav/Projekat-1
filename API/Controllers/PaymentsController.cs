using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        private readonly IConfiguration _config;
         private readonly ILogger<PaymentsController> _logger;
        public PaymentsController(PaymentService paymentService, StoreContext context, IConfiguration config, ILogger<PaymentsController> logger)
        {
            _config=config;
            _context = context;
            _paymentService = paymentService;
             _logger = logger;
       
            
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _context.BasketOprema
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

                if (basket == null) return NotFound();
                var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);
                if(intent == null) return BadRequest(new ProblemDetails{Title= "Problem prilikom kreiranja kartice za placanje"});

                basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
                basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

                _context.Update(basket);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return BadRequest(new ProblemDetails{Title="Problem azuriranja korpe"});

                return basket.MapBasketToDto();
                 

        }

        

       [HttpPost("webhook")]
       public async Task<ActionResult>StripeWebhook()
       {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

        var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
        _config["StripeSettings:WhSecret"]);

         var charge = (Charge)stripeEvent.Data.Object;

         var order = await _context.Orders.FirstOrDefaultAsync(x=>
         x.PaymentIntentId == charge.PaymentIntentId);

         if(charge.Status == "succeeded") 
         order.OrderStatus = OrderStatus.PrimljenaUplata;
         
         await _context.SaveChangesAsync();
         
         return new EmptyResult();
          }


          
                
                    
                }
            }


