//Validación campo país
const formulario = document.getElementById("formulario"); //porque se envían todos los campos del formulario a la vez

function val_pais(pais)
{
    const paises = ["España", "Italia", "Polonia", "Portugal", "China"]; //Comprobación de si el país está en la lista
    for(let i=0; i< paises.length; i++)
    {
        pais = pais.trim().toLowerCase();
        if(pais==paises[i].trim().toLowerCase())
        {
            return true;
        }
    }
    return false;
}



//Ventana modal
function mostrarModal(titulo, mensaje) 
{
    document.getElementById("error").textContent = titulo;
    document.getElementById("mensajeModal").textContent = mensaje;
    document.getElementById("modal").style.display = "block";
}

// Elementos de la ventana modal
const modal = document.getElementById("modal");
const cerrarMod = document.getElementById("cerrar_m");


// Ocultar la ventana al cargar la página
modal.style.display = "none";

// Validar el formulario al enviarlo
formulario.addEventListener("submit", function(event) {
    const pais = document.getElementById("pais").value;

    if (!val_pais(pais)) {
        event.preventDefault();

        // Mostrar la ventana modal
        mostrarModal("País incorrecto", "Error: debe introducir un país de la lista.");
    }
});

// Cerrar la ventana al pulsar Aceptar
cerrarMod.addEventListener("click", function() {
    modal.style.display = "none";
});
