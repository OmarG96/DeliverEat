using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DeliverEat.Models
{
    public class Pedido
    {
        public string ComercioNombre { get; set; }
        public float Total { get; set; }
        public bool PagaConTarjeta { get; set; }
        public float MontoEfectivo { get; set; }
    }
}