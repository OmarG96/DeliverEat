using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using DeliverEat.Models;

namespace DeliverEat.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using DeliverEat.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Producto>("Productos");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ProductosController : ODataController
    {
        private ProductosDBContext db = new ProductosDBContext();

        // GET: odata/Productos
        [EnableQuery]
        public IQueryable<Producto> GetProductos()
        {
            return db.Productos;
        }

        // GET: odata/Productos(5)
        [EnableQuery]
        public SingleResult<Producto> GetProducto([FromODataUri] int key)
        {
            return SingleResult.Create(db.Productos.Where(producto => producto.ID == key));
        }

        // PUT: odata/Productos(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Producto> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Producto producto = db.Productos.Find(key);
            if (producto == null)
            {
                return NotFound();
            }

            patch.Put(producto);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(producto);
        }

        // POST: odata/Productos
        public IHttpActionResult Post(Producto producto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Productos.Add(producto);
            db.SaveChanges();

            return Created(producto);
        }

        // PATCH: odata/Productos(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Producto> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Producto producto = db.Productos.Find(key);
            if (producto == null)
            {
                return NotFound();
            }

            patch.Patch(producto);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(producto);
        }

        // DELETE: odata/Productos(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Producto producto = db.Productos.Find(key);
            if (producto == null)
            {
                return NotFound();
            }

            db.Productos.Remove(producto);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductoExists(int key)
        {
            return db.Productos.Count(e => e.ID == key) > 0;
        }
    }
}
