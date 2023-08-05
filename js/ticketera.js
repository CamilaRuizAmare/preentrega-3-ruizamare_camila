const botonAsignarPendientes = document.getElementById('asignarPendientes');
const botonReasignar = document.getElementById('reasignarPendientes');
const cabeceraTabla = document.querySelector('#cabeceraTabla');
const bodyTabla = document.querySelector('#contenedorTabla')
const mainTicketera = document.getElementById('mainTicketera');
const sectionTicketera = document.getElementById('sectionTicketera');
const botonNuevoTicket = document.getElementById('nuevoTicket');
let opciones = [];
let tickets = JSON.parse(localStorage.getItem('ticket')) || [];
let plazas = [];
let clientes = [];

async function traerClientes() {
    const response = await fetch('../cuentas.json');
    if (response.ok) {
        clientes = await response.json();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'En este momento no pudimos procesar su solicitud, por favor intente más tarde',
            confirmButtonText: 'Volver',
            buttonsStyling: false,
        })
    }

};

async function traerOpciones() {
    const response = await fetch('../opciones.json');
    if (response.ok) {
        opciones = await response.json();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'En este momento no pudimos procesar su solicitud, por favor intente más tarde',
            confirmButtonText: 'Volver',
            buttonsStyling: false,
        })
    }

};

async function importarPlazas() {
    const response = await fetch('../plazas.json');
    if (response.ok) {
        plazas = await response.json();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: 'En este momento no pudimos procesar su solicitud, por favor intente más tarde',
            confirmButtonText: 'Volver',
            buttonsStyling: false,
        })
    }

};


const DateTime = luxon.DateTime;
const dt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);


function subirALocalStorage() {
    localStorage.setItem('ticket', JSON.stringify(tickets));
}

function traerDeLocalStorage() {
    JSON.parse(localStorage.getItem('ticket'));
}

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

const crearCabecera = function () {
    cabeceraTabla.innerHTML = `
                <tr class="order-ticket">
                  <th scope="col">ID</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Área</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Asunto</th>
                  <th scope="col">Asignado a:</th>
                  <th scope="col">Acciones</th>
                </tr>`
}

//por cada objeto del array guardado en localStorage se crea una fila de la tabla del inicio
const crearCuerpoTabla = function () {
    traerDeLocalStorage();
    tickets.forEach((tkt) => {
        bodyTabla.innerHTML = bodyTabla.innerHTML + ` 
            <tr class="order-ticket2">
                <th scope="row">${tkt.id}</th>
                <td>${tkt.fecha}</td>
                <td>${tkt.estado}</td>
                <td>${tkt.area}</td>
                <td>${tkt.categoria}</td>
                <td>${tkt.asunto}</td>
                <td>${tkt.asignacion}</td>
                <td>${tkt.acciones}</td>
            </tr>
        `
    })
}

//carga la pagina inicial
function cargarPaginaInicio() {
    let div = document.createElement('div');
    div.classList.add('d-flexbox');
    div.innerHTML = `
            <button type="button" class="btn button-flex" >
                Total <span class="text-dark">${tickets.length}</span>
            </button>
            <button type="button" class="btn button-flex">
                Asignados en tiempo <span class="text-dark">0</span>
            </button>
            <button type="button" class="btn button-flex">
                Sin asignar <span class="text-dark">${tickets.length}</span>
            </button>
            <button type="button" class="btn button-flex">
                Vencidos <span class="text-dark">0</span>
            </button>
    `
    sectionTicketera.appendChild(div);
    crearCabecera();
    crearCuerpoTabla();
}

async function vaciarPagina() {
    mainTicketera.innerHTML = '';
}

//se crea un form con datos iniciales y un select que se llenará segun la plaza indicada - se crea el ticket llevando la información al logalStorage y retornando a la pagina inicial 
async function crearPaginaTicket() {
    await traerOpciones();
    await importarPlazas();
    await traerClientes();
    let section = document.createElement('section');
    section.classList.add('d-flexbox');
    let form = document.createElement('form');
    form.id = 'form';
    form.classList.add('formulario2');
    let div1 = document.createElement('div');
    div1.innerHTML = `
            <label for="form-select" class="spacing">Tipo</label>
            <select class="form-select" aria-label="Disabled select example" disabled>
                <option selected>Solicitud</option>
            </select>
            <label for="form-select" class="spacing">Categoría</label>
            `
    let div2 = document.createElement('div');
    let selectOpcion = document.createElement('select');
    selectOpcion.id = 'categoria';
    selectOpcion.classList.add('form-select');
    opciones.forEach((data) => {
        let opcion = document.createElement('option');
        opcion.innerHTML = opcion.innerHTML + `
            <option value="${data.id}">${data.option}</option>
        `
        selectOpcion.appendChild(opcion);
    });
    let div3 = document.createElement('div');
    let selectPlaza = document.createElement('select');
    selectPlaza.id = 'plaza';
    selectPlaza.classList.add('form-select');
    div3.innerHTML = `<label for="form-select" class="spacing">Plaza</label>`
    plazas.forEach((data) => {
        let plaza = document.createElement('option');
        plaza.innerHTML = plaza.innerHTML + `
            <option value="${data.id}">${data.option}</option>
        `
        selectPlaza.appendChild(plaza);
    });
    function infoPlaza(value) {
        let cuentasPorPlaza = clientes.filter((cuenta) => { return cuenta.plaza === value })
        if (cuentasPorPlaza.length > 0) {
            cuentasPorPlaza.forEach((info) => {
                let cuentasPlaza = document.createElement('option');
                cuentasPlaza.innerHTML = cuentasPlaza.innerHTML + ` <option value="${info.cliente}">${info.cliente + ` ` + info.campaña}</option> `
                selectCampaña.appendChild(cuentasPlaza);
            })
        }
    };
    let verPlaza;
    let buttonBuscar = document.createElement('button');
    buttonBuscar.textContent = 'Buscar';
    buttonBuscar.classList.add('mt-3');
    let div4 = document.createElement('div');
    let selectCampaña = document.createElement('select');
    selectCampaña.id = 'campaña';
    selectCampaña.classList.add('form-select');
    div4.innerHTML = ` 
        <label for="form-select" class="spacing">Campaña</label> 
            `
    buttonBuscar.addEventListener('click', (e) => {
        e.preventDefault();
        selectCampaña.innerHTML = '';
        verPlaza = selectPlaza.value
        infoPlaza(verPlaza);
    })
    let div5 = document.createElement('div');
    div5.innerHTML = `
        <label for="formFileSm" class="form-label spacing">Adjunte su form</label>
        <input class="form-control form-control-sm" id="formFileSm" type="file">
            `
    let buttonEnviar = document.createElement('button');
    buttonEnviar.textContent = 'Enviar';
    buttonEnviar.classList.add('mt-3', 'float-end');
    //desde el evento click se corrobora que la información esté completa (en caso contrario se indica mediante un sweet alert) para cargar el nuevo ticket y redirigir al usuario a la pagina de inicio. 
    buttonEnviar.addEventListener('click', () => {
        if (selectCampaña.value != '') {
            ticketCreado = new NuevoTicket(tickets.length + 1, dt, 'Abierto', 'Planeamiento Operativo', selectOpcion.value, selectCampaña.value + ' ' + selectPlaza.value);
            tickets.push(ticketCreado);
            subirALocalStorage();
            cargarPaginaInicio();
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Información incompleta',
                text: 'Uno o más campos se encuentran vacios',
                confirmButtonText: 'Volver',
                buttonsStyling: false,
            })
        }
    });

    mainTicketera.appendChild(section);
    section.appendChild(form);
    form.appendChild(div1);
    form.appendChild(div2);
    form.appendChild(div3);
    form.appendChild(div4);
    form.appendChild(div5);
    div2.appendChild(selectOpcion);
    div3.appendChild(selectPlaza);
    div3.appendChild(buttonBuscar);
    div4.appendChild(selectCampaña);
    div5.appendChild(buttonEnviar);
}

botonNuevoTicket.addEventListener('click', async () => {
    await vaciarPagina();
    await crearPaginaTicket();

});

cargarPaginaInicio();