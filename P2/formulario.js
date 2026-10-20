//Validación campo país
const formulario = document.getElementById("formulario"); //porque se envían todos los campos del formulario a la vez
const pais = document.getElementById("pais");
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

//Validación campo ciudad
const ciudad = document.getElementById("ciudad");
function val_ciudad(ciudad)
{
    const patron = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s-]+$/;
    return patron.test(ciudad.trim());
}


//VALIDACION TEMPERATURAS

function val_temp()
{
    const tempAct= document.getElementById("tempAct"); //tomamos el valor de html
    if (tempAct.value.trim() === "") //Comprueba si el contenido del campo tras eliminar espacios está vacío
    {
        return false;
    }
    //Convertimos la constante a numero
    const temperatura = Number(tempAct.value);
    if (Number.isNaN(temperatura))
    {
        return false;
    }

    if(temperatura <22 || temperatura > 26)
    {
        return false;

    }
    else
    {
        return true;
    }
}

//VALIDACION CONTRASEÑA
const contraseña = document.getElementById("contraseña");
const seguridad = document.getElementById("seguridad"); 

function val_cont()
{
    const long = contraseña.value.length;

    if (long === 0)
    {
        seguridad.textContent = "";
    }
    else if (long < 4)
    {
        seguridad.textContent = "Nivel de seguridad muy bajo. Debe introducir al menos 9 caracteres.";
    }
    else if (long < 9)
    {
        seguridad.textContent = "Nivel de seguridad bajo. Debe introducir al menos 9 caracteres.";
    }
    else if (long < 12)
    {
        seguridad.textContent = "Nivel de seguridad medio.";
    }
    else
    {
        seguridad.textContent = "Contraseña segura.";
    }
}

contraseña.addEventListener("input", val_cont);

//Coordenadas
//Convertir coordenadas a decimal


function genEnlace(localizacion)
{
    let coord;
    coord = localizacion.split(",");
    //Cordenadas latitud
    let lat;
    let latitud;
    lat = coord[0].trim().split(/\s+/);;
    
    latitud = coordDec(lat[0], parseFloat(lat[1]), parseFloat(lat[2]), parseFloat(lat[3]));

    //Cordenadas longitud
    let long;
    let longitud;
    long = coord[1].trim().split(/\s+/);;
  
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

//Modal país
formulario.addEventListener("submit", function(event) 
{
    
    const long = contraseña.value.length;
    let errores = "";
    if (!val_pais(pais.value)) 
    {
        errores += "País incorrecto: debe introducir un país de la lista.\n";
    }
    if(!val_ciudad(ciudad.value))
    {
         errores += "Ciudad incorrecta: los datos introducidos no se corresponden con ninguna ciudad.\n";
    }
    if (!val_temp()) 
    {
        errores += "Temperatura inválida: debe estar entre 22 y 26 grados.\n";
    }

    if (contraseña.value.trim() === "") 
    {
        errores += "Debe introducir una contraseña.\n";
    } else if (long < 9) 
    {
        errores += "La contraseña debe tener al menos 9 caracteres.\n";
    }
   
    if (errores !== "") 
    {
        event.preventDefault();
        mostrarModal("Errores encontrados", errores);
    }

});
// Cerrar la ventana modal al pulsar Aceptar
cerrarMod.addEventListener("click", function()
{
    modal.style.display = "none";
});



