//Bucle para visualizar las imagenes de la galeria 
$(document).ready(function() {

    let imagenes = [
        "Cracovia.jfif",
        "Varsovia.jpg",
        "Breslavia.jpg",
        "Gdansk.jfif",
        "Zakopane.jpg",
        "Lisboa.jfif",
        "Oporto.jpg",
        "Aveiro.jpg",
        "Braga.jfif",
        "Faro.jpg",
        "Madrid.jfif",
        "Malaga.jpg",
        "Portbou.jpg",
        "Alicante.jpg",
        "Badajoz.jpg",
        "Roma.jfif",
        "Venecia.jpg",
        "Milan.jpeg",
        "Napoles.jpg",
        "Florencia.jfif"
        
    ];

    for (let i = 0; i < imagenes.length; i++) {
        let ciudad = imagenes[i].split(".")[0];         //Separo el nombre de la imagen por el punto ["Cracovia", "jfifi"] y me quedo con la primera posicion
        let pais = "";

        // Mejora 1.4: identificamos país según posición de la imágen
        if (i < 5) {
            pais = "Polonia";
        }
        else if (i < 10) {
            pais = "Portugal";
        }
        else if (i < 15) {
            pais = "España";
        }
        else {
            pais = "Italia";
        }

        $("#galeria").append(
            `<div class="foto" data-pais="${pais}">
                <img src="img/${imagenes[i]}" alt="${ciudad}">
                <p>${ciudad}</p>
            </div>`
        );

    }

    //Mejora 1.4
    $("#pais_galeria").change(function() {

        let pais_sel = $(this).val();

        // Volvemos al inicio de la galería
        $("#galeria").scrollLeft(0);

        // Recorremos todas las fotografías
        $(".foto").each(function() {

            let paisFoto = $(this).data("pais");

            if (pais_sel == "todos" || pais_sel == paisFoto) {
                $(this).show();
            }
            else {
                $(this).hide();
            }

        });

    });
    // Ampliar la imagen y mostrar su nombre al pasar el ratón
    $(".foto").hover(
        function() {
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
