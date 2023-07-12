let cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];


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
const divDatoForm = document.getElementById('avisoDatos');
const consultaGerencia = document.getElementById('nombreConsultaGerencia');
const mostrarTabla = document.getElementById('tablaInfo');
let filtroDeCuentas;

function agregarCuenta (){
    nuevaCuenta = new Cuenta (nombreCuenta.value, nombreCampaña.value, nombrePlaza.value, nombreGerencia.value, nombreJefatura.value);
    cuentas.push(nuevaCuenta);
    avisoCuentaCreada();
 }
function validarCuenta(){
    const camposForm = nombreCuenta.value != '' && nombreCampaña.value != '' && nombrePlaza.value != '' && nombreGerencia.value != '' && nombreJefatura.value != '';
    camposForm ? agregarCuenta() : avisoDatosIncompletos();
}

function resetForm(form){
     form.reset();
 }
 
function subirALocalStorage() {
     localStorage.setItem('cuentas', JSON.stringify(cuentas));
 }   
 
function traerDeLocalStorage() {
     JSON.parse(localStorage.getItem('cuentas'));
 }

function avisoDatosIncompletos(){
    divDatoForm.innerHTML = `
    <div class="text-center ">
        <p class="error">* Uno o más campos no han sido completos, por favor asegúrese de completar todos los campos.</p>
    </div>
    `
}
function avisoCuentaCreada(){
    divDatoForm.innerHTML = `
    <div class="text-center ">
        <p class="realizado">La cuenta ha sido creada exitosamente.</p>
    </div>
    `
}

function avisoSinDatos(){
    divResultado.classList.remove('display');
    divResultado.innerHTML = `
    <div class="text-center w-50">
        <p class="error">Búsqueda Erronea. Por favor ingrese el nombre correctamente.</p>
    </div>
    `
    mostrarTabla.classList.add('display');
}

const mostrarBusqueda = document.getElementById('mostrarBusqueda');

function visualizarBusqueda(){
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

function resetTabla(){
    mostrarBusqueda.innerHTML = '';
}

function validacionBusqueda(){
    filtroDeCuentas = cuentas.filter((cliente) => {return cliente.gerencia === consultaGerencia.value});
    filtroDeCuentas.length > 0 ? visualizarBusqueda() : avisoSinDatos();
}

//desde el evento Click se valida la información cargada en el form, se actualiza el array en el localStorage y se vuelve a retornar. 

botonEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    validarCuenta();
    resetForm(formularioCuentas);
    subirALocalStorage();
    traerDeLocalStorage();
});

//desde el evento Click se valida si el nombre ingresado es correcto (o no) y en consecuencia actua mostrando un msj de error o dibujando una tabla con la información correspondiente a la búsqueda. 
botonBusqueda.addEventListener('click', (e) => {
    e.preventDefault();
    resetTabla();
    validacionBusqueda();
    resetForm(formularioBusqueda);
})
