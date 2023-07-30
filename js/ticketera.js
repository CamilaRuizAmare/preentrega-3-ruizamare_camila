const botonAsignarPendientes = document.getElementById('asignarPendientes');
const botonReasignar = document.getElementById('reasignarPendientes');

botonAsignarPendientes.addEventListener('click', mostrarTostada);
botonReasignar.addEventListener('click', mostrarTostada);

function mostrarTostada(){
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