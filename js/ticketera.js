const botonAsignarPendientes = document.getElementById('asignarPendientes');
const botonReasignar = document.getElementById('reasignarPendientes');
const cabeceraTabla = document.querySelector('#cabeceraTabla');
const mainTicketera = document.getElementById('mainTicketera');
const sectionTicketera = document.getElementById('sectionTicketera');
const botonNuevoTicket = document.getElementById('nuevoTicket');

botonAsignarPendientes.addEventListener('click', mostrarTostada);
botonReasignar.addEventListener('click', mostrarTostada);

function mostrarTostada() {
  Toastify({
    text: "Herramienta en proceso",
    duration: 2500,
    gravity: "bottom",
    stopOnFocus: false,
    style: {
      background: '#FF4545',
      color: '#000000',
    },
  }).showToast();
}

const crearCabecera = async function () {
  cabeceraTabla.innerHTML = `
                <tr class="order-ticket">
                  <th scope="col">ID</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Área</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Asunto</th>
                  <th scope="col">Realizado por:</th>
                  <th scope="col">Asignado a:</th>
                  <th scope="col">Acciones</th>
                </tr>`
}

async function cargarPaginaInicio() {
  let div = document.createElement('div');
  div.classList.add('d-flexbox');
  div.innerHTML = `
            <button type="button" class="btn button-flex" >
                Total <span class="text-dark">4</span>
            </button>
            <button type="button" class="btn button-flex">
                Asignados en tiempo <span class="text-dark">4</span>
            </button>
            <button type="button" class="btn button-flex">
                Sin asignar <span class="text-dark">4</span>
            </button>
            <button type="button" class="btn button-flex">
                Vencidos <span class="text-dark">4</span>
            </button>
            <button type="button" class="btn button-flex">
                Mis asignados <span class="text-dark">4</span>
            </button>
            <button type="button" class="btn button-flex">
                Mis asignados vencidos <span class="text-dark">4</span>
            </button>
    `
  sectionTicketera.appendChild(div);
  await crearCabecera();
}

async function vaciarPagina(){
  mainTicketera.innerHTML = '';
}

function crearPaginaTicket(){
    let section = document.createElement('section');
    section.classList.add('d-flexbox')
    section.innerHTML = `
    <form action="nuevoTicket" id="form" class="formulario2">
    <div>
        <label for="form-select" class="spacing">Tipo</label>
        <div>
            <select class="form-select" aria-label="Disabled select example" disabled>
                <option selected>Solicitud</option>
            </select>
        </div>
    </div>
    <!-- Desplegable de opciones ok -->
    <div>
        <div>
            <label for="form-select" class="spacing">Categoría</label>
            <div>
                <select id="categoria" class="form-select form-select"
                    aria-label=".form-select example">
                    <option selected>Categoría</option>
                    <option value="1">Cambio CC</option>
                    <option value="2">Cambio de Vacaciones</option>
                    <option value="3">Cambio TL</option>
                    <option value="4">Modificación de contrato</option>
                    <option value="5">Solicitud de Personal</option>
                </select>
            </div>
                <div>
                    <label for="form-select" class="spacing">Plaza</label>
                    <div>
                        <select id="plaza" class="form-select form-select"
                            aria-label=".form-select example">
                            <option selected>Plaza</option>
                            <option value="6">Buenos Aires</option>
                            <option value="7">Córdoba</option>
                            <option value="8">Formosa</option>
                            <option value="9">Paraguay</option>
                        </select>
                    </div>
                        <div>
                            <label for="form-select" class="spacing">Campaña</label>
                            <div>
                                <select id="plaza" class="form-select form-select"
                                    aria-label=".form-select example">
                                    <option selected>Campaña</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                    <option value="">Cargar Campañas</option>
                                </select>
                            </div>
                            <div>
                                <label for="formFileSm" class="form-label spacing">Adjunte su form</label>
                                <input class="form-control form-control-sm" id="formFileSm" type="file">
                            </div>
                            </div>
                        </div>
</form>
    `
mainTicketera.appendChild(section);
}

botonNuevoTicket.addEventListener('click', async () => {
    await vaciarPagina();
    crearPaginaTicket();

})

cargarPaginaInicio();






function subirALocalStorage() {
  localStorage.setItem('cuentas', JSON.stringify(cuentas));
}

function traerDeLocalStorage() {
  JSON.parse(localStorage.getItem('cuentas'));
}

let cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];