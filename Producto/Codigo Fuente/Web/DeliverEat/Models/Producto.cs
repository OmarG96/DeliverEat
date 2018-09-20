using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace DeliverEat.Models
{
    public class Producto
    {
        public int ID { get; set; }
        public string nombre { get; set; }
        public float precio { get; set; }
        public float volumen { get; set; }
        public int peso { get; set; }
    }

    class ProductosDBContext : DbContext
    {
        public DbSet<Producto> Productos { get; set; }
    }
}