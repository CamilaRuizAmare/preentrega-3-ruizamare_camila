const cuentas = [
    bhCob = new Cuenta('Banco Hipotecario', 'Cobranzas', 'Formosa', 'Cristian Zozaya', 'Lizzie Ruiz Diaz'),
    bhCust = new Cuenta('Banco Hipotecario', 'Customer', 'Formosa', 'Cristian Zozaya', 'Lizzie Ruiz Diaz'),
    claro611 = new Cuenta('Claro', 'Customer', 'Cordoba', 'Carolina Simes', 'Emilse Copetti'),
    claroMora = new Cuenta('Claro', 'Cobranzas', 'Cordoba', 'Carolina Simes', 'Martin Cappuozzo'),
    claroTec = new Cuenta('Claro', 'Retencion', 'Cordoba', 'Carolina Simes', 'Karina Lizzama'),
    telecom = new Cuenta('Telecom', 'Customer', 'Buenos Aires', 'Fabian Perezlindo', 'Natalie Manduci'),
    cruzDelSur = new Cuenta('Cruz del Sur', 'Customer', 'Buenos Aires', 'Fabian Perezlindo', 'Paola Makuch'),
    tnCobranzasCba = new Cuenta('Tarjeta Naranja', 'Cobranzas', 'Córdoba', 'Cristian Zozaya', 'Mario Quinteros'),
    tnCobranzasFsa = new Cuenta('Tarjeta Naranja', 'Cobranzas', 'Formosa', 'Cristian Zozaya', 'Mario Quinteros'),
];

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
    divResultado.innerHTML = `
    <div class="text-center w-50">
        <p class="error">Búsqueda Erronea. Por favor ingrese el nombre correctamente.</p>
    </div>
    `
}

function visualizarBusqueda(){
    const mostrarBusqueda = document.getElementById('mostrarBusqueda');
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
}

function resetTabla(){
    consultaGerencia.addEventListener('keypress', () => {
        mostrarTabla.innerHTML = '';
    })
}

let filtroDeCuentas;

function validacionBusqueda(){
    filtroDeCuentas = cuentas.filter((cliente) => {return cliente.gerencia === consultaGerencia.value});
    filtroDeCuentas.length > 0 ? visualizarBusqueda() : avisoSinDatos();
}


botonEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    validarCuenta();
    resetForm(formularioCuentas);
    subirALocalStorage();
    traerDeLocalStorage();
});


botonBusqueda.addEventListener('click', (e) => {
    e.preventDefault();
    validacionBusqueda();
    resetForm(formularioBusqueda);
    //resetTabla();
    //Ver de que manera incluir un bucle o cómo hacer para que al cargar la info ok no haya problema. VER!!!!
})
