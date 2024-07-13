using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     public class BuggyController: BaseApiController
    {
        [HttpGet ("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

         [HttpGet ("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title="Ovo je los zahtjev"});
        }

         [HttpGet ("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }

         [HttpGet ("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "Ovo je prvi greska");
             ModelState.AddModelError("Problem 2", "Ovo je druga greska");
             return ValidationProblem();
        }

         [HttpGet ("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Ovo je greska servera");
        }
        
        
    }
}
