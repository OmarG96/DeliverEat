using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DeliverEat.Models
{
    public class Direccion
    {
        //public int ID { get; set; }
        public string barrio { get; set; }
        public string calle { get; set; }
        public int numero { get; set; }
        public string codigoPostal { get; set; }
        public int piso { get; set; }
        public string departamento { get; set; }
    }
}