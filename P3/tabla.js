
function formatearTabla($tabla) {
   $tabla.css({
        'border-collapse': 'collapse',
        'width': '90%',
        'table-layout': 'fixed',
        'margin': '20px auto',
        'height': 'auto',
        'background-color': 'white',
        'box-shadow': '0px 3px 8px rgba(15,118,110,0.20)'
    });
    $tabla.find('th').css({
        'background-color': '#0F766E',
        'color': 'white',
        'padding': '15px',
        'text-align': 'center',
        'border': '1px solid #99F6E4',
        'font-size': '18px'
    });

    $tabla.find('td').css({
        'padding': '12px',
        'text-align': 'center',
        'border': '1px solid #99F6E4',
        'background-color': '#FFFFFF',
        'color': '#164E63',
        'font-size': '16px'
    });

   
}


$(document).ready(function() {

  // Por defecto se muestra la tabla1
  formatearTabla($('#pagina1 table'));
  $('#pagina1').show();
  $('#pagina2, #pagina3, #pagina4').hide();

  // 2. Evento clic en los botones de paginación
  $('.boton_pag').click(function(e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del enlace

    var objetivo = $(this).data('target'); 

    // Ocultamos todas las páginas
    $('.pagina-tabla').hide();
    formatearTabla($(objetivo).find('table'));
    $(objetivo).show(); //Mostramos el contenido de la pagina que se ha selccionado
  });

});