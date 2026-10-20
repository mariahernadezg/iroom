// Buscamos el campo donde se escribe el nombre
var nombre = document.getElementById("fname");

// Comprobamos si ya hay un nombre guardado
var nombreGuardado = localStorage.getItem("fname");
if (nombreGuardado && nombreGuardado !== "undefined") 
{ 
    nombre.value = nombreGuardado; 
    document.getElementById("mensaje").innerHTML = "Hola " + nombreGuardado + ": Bienvenido/a a Smart Room"; 
}

// Cuando se pulsa el botón de guardar
document.getElementById("formulario_nombre").onsubmit = function() 
{

    // Guardamos el nombre escrito
    localStorage.setItem("fname", nombre.value);

    alert("Nombre guardado correctamente.");

    // Volvemos a la página principal
    window.location.href = "index.html";

                return false;
}

//Validación correo electrónico

function valEmail(email)
{
    let posArroba = email.indexOf("@");
    if (posArroba === -1) //La @ debe estar en el correo
    {
        return false;
    } else if (posArroba != email.lastIndexOf("@"))//No puede haber más de una @
    {
        return false;
    }

    //El correo no puede contener espacios en blanco
    if(email.indexOf(" ")!=-1)
    {
        return false;
    }

    let campos = email.split("@"); //Separamos el correo en usuario y dominio
    let usuario = campos[0];
    let dominio = campos[1];

    if(usuario.length === 0 || dominio.length === 0) // usuario y dominio deben tener contenido
    {
        return false;
    }
    if(dominio.indexOf(".") === -1) //El dominio debe tener uno o más puntos
    {
        return false;
    }

    return true; //Si el correo es válido

}
//Validación correo con expresiones regulares

function valEmailReg(email)
{
    let correo =  /^[^@\s]+@[^@.\s]+(\.[^@.\s]+)+$/; //Definición formato correo electrónico
    return correo.test(email);

    
}

document.addEventListener("DOMContentLoaded", function () {
    const email = document.getElementById("correo");
    const botonJs = document.getElementById("btnJs");
    const mensaje = document.getElementById("emailError");
    const botonRegEx = document.getElementById("btnRegEx");

    botonJs.addEventListener("click", function () {
        if(!valEmail(email.value))
        {
            mensaje.textContent = "Correo con formato incorrecto. Debe ser del tipo usuario@dominio";
        }
        else
        {
            mensaje.textContent = "Correo válido";
        }
        
    });

    botonRegEx.addEventListener("click", function () {
        if(!valEmailReg(email.value))
        {
            mensaje.textContent = "Correo con formato incorrecto. Debe ser del tipo usuario@dominio";
        }
        else
        {
            mensaje.textContent = "Correo válido";
        }
        
    });
});
