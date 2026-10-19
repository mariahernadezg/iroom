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

//Coordenadas
//Convertir coordenadas a decimal


function genEnlace(localizacion)
{
    let coord;
    coord = localizacion.split(",");
    //Cordenadas latitud
    let lat;
    let latitud;
    lat = coord[0].trim().replace(/[º°'"]/g, "").split(/\s+/);;
    
    latitud = coordDec(lat[0], parseFloat(lat[1]), parseFloat(lat[2]), parseFloat(lat[3]));

    //Cordenadas longitud
    let long;
    let longitud;
    long = coord[1].trim().replace(/[º°'"]/g, "").split(/\s+/);;
  
    longitud = coordDec(long[0], parseFloat(long[1]), parseFloat(long[2]), parseFloat(long[3]));

    //Creación del enlace
    let enlace = "https://maps.google.com/maps?q=" + latitud + "," + longitud;

    document.getElementById("coordenadasGPS").innerHTML =
        '<a href="' + enlace + '" target="_blank">Ver en Google Maps</a>';
}

function coordDec(coordenada, grados, min, seg)
{
    let decimal;
    decimal = grados + min/60 + seg/3600
    if (coordenada == "S" || coordenada == "O")
    {
        decimal = -decimal; //Si las coordenadas son S u O, se cambia a negativo
    }
    return decimal;
}

document.addEventListener("DOMContentLoaded", function () {
    const loc = document.getElementById("localizacion");
    const resultado = document.getElementById("coordenadasGPS");

    loc.addEventListener("input", function () {
        resultado.textContent = ""; //Ir generando el enlace a medida que el usuario escribe
       if (loc.value.trim() !== "") 
        {
            genEnlace(loc.value);
        }
        
    });
});




//Ventana modal
function mostrarModal(titulo, mensaje) 
{
    document.getElementById("error").textContent = titulo;
    document.getElementById("mensajeModal").textContent = mensaje;
    document.getElementById("modal").style.display = "block";
}


const modal = document.getElementById("modal");
const cerrarMod = document.getElementById("cerrar_m");

modal.style.display = "none";

formulario.addEventListener("submit", function(event) {
    const pais = document.getElementById("pais").value;
    

    if (!val_pais(pais)) {
        event.preventDefault();

        mostrarModal("País incorrecto", "Error: debe introducir un país de la lista.");
    }

    
});

cerrarMod.addEventListener("click", function() {
    modal.style.display = "none";
});
