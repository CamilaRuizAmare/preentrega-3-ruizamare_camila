const formularioCuentas = document.getElementById('form-nuevaCuenta');
const formularioBusqueda = document.getElementById('formBusqueda');
const nombreCuenta = document.getElementById('nombreCuenta');
const nombreCampaña = document.getElementById('nombreCampaña');
const nombrePlaza = document.getElementById('nombrePlaza');
const nombreGerencia = document.getElementById('nombreGerencia');
const nombreJefatura = document.getElementById('nombreJefatura');
const botonEnviar = document.getElementById('buttonSubmit');
const botonBusqueda = document.getElementById('btnBusqueda');
const divResultado = document.getElementById('resultadoError');
const consultaGerencia = document.getElementById('nombreConsultaGerencia');
const mostrarTabla = document.getElementById('tablaInfo');
const mostrarBusqueda = document.getElementById('mostrarBusqueda');
let filtroDeCuentas;
let cuentas = [];

//Se simula la creacion de una nueva cuenta. 
function agregarCuenta() {
    Swal.fire({
        title: 'Usted esta por crear la siguiente cuenta',
        html: `
                    Cuenta: ${nombreCuenta.value}<br>
                    Campaña: ${nombreCampaña.value}<br>
                    Plaza: ${nombrePlaza.value}<br>
                    Gerencia: ${nombreGerencia.value}<br>
                    Jefatura: ${nombreJefatura.value}<br>
                Presione 'Guardar' para confirmar o 'Atrás' para corregir sus datos.`,
        confirmButtonText: 'Guardar',
        showCancelButton: true,
        cancelButtonText: 'Atrás',
        buttonsStyling: false,
    }) .then((result) => {
        if(result.isConfirmed){
        Swal.fire({
            icon: 'success',
            title: 'Cuenta creada',
            text: `Su nueva cuenta del cliente ${nombreCuenta.value} perteneciente a la gerencia ${nombreGerencia.value} ha sido creada.`,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          })
            resetForm(formularioCuentas);
            }
          });
        }


function validarCuenta() {
    const camposForm = nombreCuenta.value != '' && nombreCampaña.value != '' && nombrePlaza.value != '' && nombreGerencia.value != '' && nombreJefatura.value != '';
    camposForm ? agregarCuenta() : avisoDatosIncompletos();
}
 
function resetForm(form) {
    form.reset();
}

function avisoDatosIncompletos() {
    Swal.fire({
        icon: 'warning',
        title: 'Información incompleta',
        text: 'Uno o más campos se encuentran vacios',
        confirmButtonText: 'Volver',
        buttonsStyling: false,
      })
}


//Crea un div informando que no se encontraron datos en la búsqueda
function avisoSinDatos() {
    divResultado.classList.remove('display');
    divResultado.innerHTML = `
    <div class="text-center w-50">
        <p class="error">Búsqueda Erronea. Por favor ingrese el nombre correctamente.</p>
    </div>
    `
    mostrarTabla.classList.add('display');
}

//Se crea una tabla con los clientes de la gerencia buscada
function visualizarBusqueda() {
    mostrarTabla.classList.remove('display');
    filtroDeCuentas.forEach((cliente) => {
        mostrarBusqueda.innerHTML = mostrarBusqueda.innerHTML +
            `
                    <tr class="order-ticket2">
                        <th scope="row">${cliente.cliente}</th>
                        <td>${cliente.campaña}</td>
                        <td>${cliente.plaza}</td>
                        <td>${cliente.gerencia}</td>
                        <td>${cliente.jefatura}</td>
                    </tr>
                    `
    })
    divResultado.classList.add('display');
}

function resetTabla() {
    mostrarBusqueda.innerHTML = '';
}

async function cargarCuentas() {
    const response = await fetch('../cuentas.json');
    if(response.ok) {
        cuentas = await response.json();
    } else{
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'En este momento no pudimos procesar su solicitud, por favor intente más tarde',
            confirmButtonText: 'Volver',
            buttonsStyling: false,
          })
    }
    
};

//se valida la busqueda realizada y muestra la información correspondiente con la busqueda
async function validacionBusqueda() {
    await cargarCuentas();
    filtroDeCuentas = cuentas.filter((cliente) => { return cliente.gerencia === consultaGerencia.value });
    filtroDeCuentas.length > 0 ? visualizarBusqueda() : avisoSinDatos();
};

//desde el evento Click se valida la información cargada en el form y se simula su carga en una base de datos

botonEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    validarCuenta();
});

//desde el evento Click se valida si el nombre ingresado es correcto (o no) y en consecuencia actua mostrando un msj de error o dibujando una tabla con la información correspondiente a la búsqueda. 
botonBusqueda.addEventListener('click', async (e) => {
    e.preventDefault();
    resetTabla();
    await validacionBusqueda();
    resetForm(formularioBusqueda);
});