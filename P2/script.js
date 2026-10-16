const formulario = document.getElementById("formulario");

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


formulario.addEventListener("submit", function(event)
{
    const pais = document.getElementById("pais").value;

    if (!val_pais(pais))
    {
        event.preventDefault();
        alert("Error: el país introducido no es válido.");
    }
});

