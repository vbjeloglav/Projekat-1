using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ReservationDto
    {
    public string CustomerName { get; set; }
    public string ContactEmail { get; set; }
    public DateTime DatumIznajmljivanja { get; set; }
    public DateTime DatumVracanja { get; set; }
      //public string OrderStatus { get; set; }
    }
}