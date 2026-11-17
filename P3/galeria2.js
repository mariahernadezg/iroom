//Bucle para visualizar las imagenes de la galeria 
$(document).ready(function() {

    let imagenes = [
        "Cracovia.jfif",
        "Varsovia.jpg",
        "Gdansk.jfif",
        "Lisboa.jfif",
        "Oporto.jpg",
        "Aveiro.jpg",
        "Madrid.jfif",
        "Malaga.jpg",
        "Portbou.jpg",
        "Roma.jfif",
        "Venecia.jpg",
        "Milan.jpeg"
        
    ];

    for (let i = 0; i < imagenes.length; i++) {
        let ciudad = imagenes[i].split(".")[0];         //Separo el nombre de la imagen por el punto ["Cracovia", "jfifi"] y me quedo con la primera posicion
        $("#galeria").append(
            `<div class="foto">
                <img src="img/${imagenes[i]}" alt="${ciudad}">
                <p>${ciudad}</p>
            </div>`
        );

    }


    // Ampliar la imagen y mostrar su nombre al pasar el ratón
    $(".foto").hover(function() {
        $(this).toggleClass("ampliada");
    });

    // Botón anterior [<]
    $("#izquierda").click(function() {
        $("#galeria").animate({
            scrollLeft: "-=200"
        }, 400);
    });

    // Botón siguiente [>]
    $("#derecha").click(function() {
        $("#galeria").animate({
            scrollLeft: "+=200"
        }, 400);
    });
});
