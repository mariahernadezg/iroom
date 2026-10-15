const formulario = document.getElementById("pais");

function val_pais(pais)
{
    var paises = ["España", "Italia", "Francia", "Alemania"];
    for(i=0; i<len(paises); i++)
    {
        if(pais=paises[i])
        {
            return true;
        }
    }
    return false;
}


formulario.addEventListener("submit", function(event)
{
    const pais = document.getElementById("country").value.trim();

    if (!val_pais(pais))
    {
        event.preventDefault();
        alert("Error: el país introducido no es válido.");
    }
});