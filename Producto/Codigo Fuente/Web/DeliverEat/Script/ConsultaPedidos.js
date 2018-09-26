$(function () {

    $.ajax({
        type: "POST",
        url: '../Servidor.aspx/GetPedidos',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $('#textoResultado').text(JSON.stringify(data.d));
            //for (let i = 0; i < data.d.length; i++) {
            //    let pedido = data.d[i];


            //    $('#contenedorPedidos').append($('<div class="pedido"><label>Comercio: ' + pedido.ComercioNombre + '</label><br/><label>Efectivo: ' + pedido.PagaConTarjeta+ '</label></div>'));

            //}
        },
        failure: function (response) {
            $('#textoPedidos').text("Error consultando los pedidos");
        }
    });
});