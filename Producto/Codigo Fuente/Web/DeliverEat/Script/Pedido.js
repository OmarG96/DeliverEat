//Definicion de variables
var montoTotal = 615;
let conPago = false;
let conFecha = false;
var patron_nombreTitular = "^[a-z A-Z]{4,30}$";
var patron_dni = "^[0-9]{7,8}$";
var patron_numeroTarjeta = "^[0-9]{16}$";
var patron_codigoSeguridad = "^[0-9]{3}$";

$(function () {
    initFormasDePago();
    initFecha();
    inicializarPopups();

    $('.botonConfirmarPedido').click(function () {

        //Validaciones de campos correspondientes al domicilio
        let barrio = $('#txtBarrio').val().trim();
        let calle = $('#txtCalle').val().trim();
        let numero = $('#txtNumero').val().trim();
        let codigoPostal = $('#txtCodigoPostal').val().trim();

        let conDomicilio = barrio != "" && calle != "" && numero != "" && codigoPostal != "";

        if (conDomicilio == false || conFecha == false || conPago == false) {
            $('.popupError .texto').text('Debe indicar su domicilio, forma de pago y fecha de envío');
            $('.popupError').addClass('visible');
            return;
        }

        //Pantalla de carga al registrar el pedido, se deben borrar los inputs
        $('#contenedorCargando').addClass('visible');
        setTimeout(function () {
            $('#contenedorCargando').removeClass('visible');
            $('.popupError .texto').text('Su pedido ha sido registrado correctamente');
            $('.popupError').addClass('visible');
        }, 2000);
    });



    $('.popupError .botonAceptar').click(function () {
        $('.popupError').removeClass('visible');
    });
});

//Formas de pago
function initFormasDePago() {
    initPopupPagoEfectivo();
    initPopupPagoTarjeta();
}

//Fecha de recepcion
function initFecha() {
    $('.botonLoAntesPosible').click(function () {
        $('#contenedorFechaDeEnvio').slideDown(300);
        $('#textoFechaDeEnvio').text('Recibirás el pedido lo antes posible');
        conFecha = true;
    });

    $(".botonDefinirFechaYHora").click(function () {
        $(".popupDefinirFechaYHora").addClass("visible");
    });

    initPopupFechaYHora();
}


function inicializarPopups() {
    $('.popup .fondo').click(function () {
        $(".popup").removeClass("visible");
    });

    $(".popup .botonVolver").click(function () {
        $(".popup").removeClass("visible");
    });
}

function initPopupPagoEfectivo() {
    $(".botonEfectivo").click(function () {
        limpiarPopupEfectivo();
        $(".popupPagoEfectivo").addClass("visible");
    });

    $('.botonCargarMonto').click(function () {
        cargarEfectivo();
    });
}

function initPopupPagoTarjeta() {
    $(".botonTarjeta").click(function () {
        $(".popupPagoTarjeta").addClass("visible");
        limpiarPopupTarjeta();
    });

    $('.botonCargarTarjeta').click(function () {
        cargarTarjeta();
    });
}


//FUncion para limpiar los campos del popup pago con tarjeta
function limpiarPopupTarjeta() {
    $('.popupPagoTarjeta input').val('');
    $('.popupPagoTarjeta input').parents('.form-group').removeClass('error');
}

//Ocular popup y mostrar label que indica la opcion de pago seleccionada
function cargarTarjeta() {
    if (!validarTarjeta()) return;

    $('#contenedorFormaDePagoSeleccionada').show();
    $('#textoFormaDePagoSeleccionada').text('Seleccionaste pagar con Tarjeta de Credito N° ' + $('#txtNumeroTarjeta').val());
    $('.popupPagoTarjeta').removeClass('visible');

    conPago = true;
}

//Validacion de datos ingresados en pago con tarjeta
function validarTarjeta() {
    $('.popupPagoTarjeta input').parents('.form-group').removeClass('error');

    var tieneAlgunError = false;

    //Nombre y apellido
    if (!checkInput("#txtNombreYApellido", patron_nombreTitular)) {
        let valor = $("#txtNombreYApellido").val();
        if (valor == "") {
            inputConError("#txtNombreYApellido", 'Dato requerido');
        } else {
            inputConError("#txtNombreYApellido", 'Dato inválido');
        }
        tieneAlgunError = true;
    }

    //DNI
    if (!checkInput("#txtDNI", patron_dni)) {
        let valor = $("#txtDNI").val();
        if (valor == "") {
            inputConError("#txtDNI", 'Dato requerido');
        } else {
            inputConError("#txtDNI", 'Dato inválido');
        }
        tieneAlgunError = true;
    }

    //Numero de tarjeta
    if (!checkInput("#txtNumeroTarjeta", patron_numeroTarjeta)) {
        let valor = $("#txtNumeroTarjeta").val();
        if (valor == "") {
            inputConError("#txtNumeroTarjeta", 'Dato requerido');
        } else {
            inputConError("#txtNumeroTarjeta", 'Dato inválido');
        }
        tieneAlgunError = true;
    }

    //Codigo de seguridad
    if (!checkInput("#txtCodigoSeguridad", patron_codigoSeguridad)) {
        let valor = $("#txtCodigoSeguridad").val();
        if (valor == "") {
            inputConError("#txtCodigoSeguridad", 'Dato requerido');
        } else {
            inputConError("#txtCodigoSeguridad", 'Dato inválido');
        }
        tieneAlgunError = true;
    }

    //Fecha
    let fecha = $('#fechaVencimiento').val();
    if (fecha == "") {
        inputConError('#fechaVencimiento', 'Dato requerido');
        tieneAlgunError = true;
    } else {
        let partes = fecha.split('/');
        if (partes.length != 2) {
            inputConError('#fechaVencimiento', 'Fecha inválida');
            tieneAlgunError = true;
        } else {
            let mes = partes[0];
            let año = partes[1];

            if (!parseInt(mes) || !parseInt(año)) {
                inputConError('#fechaVencimiento', 'Fecha inválida');
                tieneAlgunError = true;

            } else {
                if (mes < 0 || mes > 12 || año < 1900) {
                    inputConError('#fechaVencimiento', 'Fecha inválida');
                    tieneAlgunError = true;
                } else {
                    let fechaActual = new Date();
                    let fechaElegida = new Date(parseInt(partes[1]), parseInt(partes[0]), 0);
                    if (fechaElegida < fechaActual) {
                        inputConError('#fechaVencimiento', 'Debe ser mayor a la fecha actual');
                        tieneAlgunError = true;
                    }
                }
            }
        }
    }

    return tieneAlgunError == false;
}

//Ocultar popup y mostrar mensaje de forma de pago seleccionada
function cargarEfectivo() {
    if (!validarEfectivo()) return;

    $('#contenedorFormaDePagoSeleccionada').show();
    $('#textoFormaDePagoSeleccionada').text('Seleccionaste pagar con efectivo. Monto: $' + $('#txtMontoAbonar').val());
    $('.popupPagoEfectivo').removeClass('visible');

    conPago = true;
}

//Limpiar los campos contenidos en el popup pago en efectivo
function limpiarPopupEfectivo() {
    $('.popupPagoEfectivo input').parents('.form-group').removeClass('error');
    $('.popupPagoEfectivo input').val('');
}

//Validar datos de pago en efectivo
function validarEfectivo() {

    $('.popupPagoEfectivo input').parents('.form-group').removeClass('error');

    var tieneAlgunError = false;
    let monto = $('#txtMontoAbonar').val();
    if (monto == "") {
        inputConError('#txtMontoAbonar', 'Dato requerido');
        tieneAlgunError = true;
    } else {
        if (!parseFloat(monto)) {
            inputConError('#txtMontoAbonar', 'Dato inválido');
            tieneAlgunError = true;
        } else {
            monto = parseFloat(monto);
            if (monto < montoTotal) {
                inputConError('#txtMontoAbonar', 'Debe ser mayor a $' + montoTotal);
                tieneAlgunError = true;
            }
        }
    }
    return tieneAlgunError == false;
}


function initPopupFechaYHora() {
    $(".botonDefinirFechaYHora").click(function () {
        $(".popupDefinirFechaYHora").addClass("visible");
        limpiarPopupFechaYHora();
    });

    $('.botonConfirmarFechaYHora').click(function () {
        confirmarFechaYHora();
    });
}


//Limpiar campos contenidos en popup fecha y hora de envio
function limpiarPopupFechaYHora() {
    $('.popupDefinirFechaYHora input').val('');
    $('.popupDefinirFechaYHora input').parents('.form-group').removeClass('error');
}


//Ocultar popup fecha y hora de envio y mostrar mensaje resumen de la opcion elegida
function confirmarFechaYHora() {
    if (!validarFechaYHora()) return;

    $('#contenedorFechaDeEnvio').slideDown(300);
    $('#textoFechaDeEnvio').text('Recibirás el pedido el ' + $('#txtFechaEntrega').val() + ' a las ' + $('#txtHoraEntrega').val());
    $('.popupDefinirFechaYHora').removeClass('visible');

    conFecha = true;
}


//Validar datos ingresados en el popup fecha y hora de envio
function validarFechaYHora() {
    $('.popupDefinirFechaYHora input').parents('.form-group').removeClass('error');

    let conAlgunError = false;

    let fecha = $('#txtFechaEntrega').val();
    if (fecha == "") {
        inputConError('#txtFechaEntrega', 'Dato requerido');
        conAlgunError = true;
    }

    let hora = $('#txtHoraEntrega').val();
    if (hora == "") {
        inputConError('#txtHoraEntrega', 'Dato requerido');
        conAlgunError = true;
    }


    if (conAlgunError == false) {
        let fechaActual = new Date();
        let partesFecha = fecha.split('-');
        let partesHora = hora.split(':');
        let fechaSeleccionada = new Date(parseInt(partesFecha[0]), parseInt(partesFecha[1]) - 1, parseInt(partesFecha[2]), partesHora[0], partesHora[1], 0, 0);

        console.log(fechaActual);
        console.log(fechaSeleccionada);

        if (fechaSeleccionada < fechaActual) {
            inputConError('#txtFechaEntrega', 'La fecha debe ser posterior a la actual');
            conAlgunError = true;
        }
    }
    return conAlgunError == false;
}

//Identificador de errores en campos
function inputConError(idInput, mensaje) {
    $(idInput).parents('.form-group').addClass('error');
    $(idInput).siblings('.error').text(mensaje);
}

//Funcion para comparar datos respecto a un patrón designado
function checkInput(idInput, pattern) {
    return $(idInput).val().match(pattern) ? true : false;
}