
function resultadoBusqueda(){   
    divResultado.innerHTML = `
    <table class="table">
                    <thead>
                      <tr class="order-ticket text-center">
                        <th scope="col">Cliente</th>
                        <th scope="col">Campaña</th>
                        <th scope="col">Plaza</th>
                        <th scope="col">Gerencia</th>
                        <th scope="col">Jefatura</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider text-center">
                      <tr class="order-ticket2">
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>aaassddo</td>
                      </tr>
                    </tbody>
                  </table>
    
    `
}

/* 
function validacion() {
    const validarBusqueda = nombreConsultaCliente.value || nombreConsultaGerencia.value || nombreConsultaJefatura.value
    validarBusqueda ? resultadoBusqueda() : avisoSinDatos();
} */