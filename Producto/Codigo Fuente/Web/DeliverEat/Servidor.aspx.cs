using DeliverEat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DeliverEat
{
    public partial class Servidor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        private static List<string> pedidos;

        [WebMethod]
        public static bool AgregarPedido(string pedido) {

            try
            {
                if (pedidos == null)
                {
                    pedidos = new List<string>();
                }
                pedidos.Add(pedido);
                return true;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        [WebMethod]
        public static List<string> GetPedidos()
        {
            if (pedidos == null)
            {
                pedidos = new List<string>();
            }
            return pedidos;
        }

    }
}