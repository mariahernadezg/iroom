$(document).ready(function() {

    // Mostrar información cuando pasamos el ratón sobre una imagen
    $(".imagen").hover(

        function() {
            $(this).find("p").fadeIn();
        },

        function() {
            $(this).find("p").fadeOut();
        }

    );

});