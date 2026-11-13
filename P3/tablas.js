
function formatearTabla($tabla) {
    //Fila historiograna
  if ($tabla.find('.fila-historiograma').length === 0) {
    const filaCheckboxes = `
      <tr class="fila-historiograma">
      <td>Mostrar histograma</td>
      <td><input type="checkbox" class="check" data-target="#temp"></td>
      <td><input type="checkbox" class="check" data-target="#hum"></td>
      <td><input type="checkbox" class="check" data-target="#pres"></td>
      <td><input type="checkbox" class="check" data-target="#viento"></td>
      <td>-</td>
      </tr>
      `;
    $tabla.find('tbody').prepend(filaCheckboxes);
    }
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

  // Por defecto se muestra la tabla3
  formatearTabla($('#pagina3 table'));
  $('#pagina3').show();
  $('#pagina1, #pagina2, #pagina4').hide();
  // Se activa cuando se hace click sobre los botones
  $('.boton_pag').click(function(e) {
    e.preventDefault(); // Para que los botones no se comporten como un enlace por defecto
    var objetivo = $(this).data('target'); //Cuando se hace click se ve el valor del botón

    // Ocultamos todas las páginas
    $('.pagina-tabla').hide();
    //Ocultamos el histograma al cambiar de página
    $('#seccion-histograma').hide();
    //Desmarcamos cualquier checkbox que se hubiera quedado marcado
    $('.check').prop('checked', false);
    if (objetivo == '#pagina1')
    {
      loadXml();
    }
    else
      if (objetivo == '#pagina2')
      {
        loadJson();
      }
      else
      {
        formatearTabla($(objetivo).find('table'));
      }
    $(objetivo).show(); //Mostrar página seleccionada
  });
  $('#seccion-histograma').hide();//Por defecto historiograma oculto 
});

//Historiograma
$(document).on('click', '.check', function(){
    if ($(this).is(':checked')) {
      $('.pagina-tabla:visible .check').not(this).prop('checked', false); //Solo se marca una casilla a la vez
      var casilla = $(this).data('target'); 
      historiograma(casilla);
    } else {
      $('#seccion-histograma').hide(); //Si se desmarca la casilla ocultamos el historiograma 
    }
  });

//Envío de datos XML
function loadXml() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    tabla_xml(this);
  }
  xhttp.open("GET", "pagina1.xml"); //Configuramos la petición
  xhttp.send();//Lanzamos la petición al servidor
}
function tabla_xml(xml) {
  const xmlDoc = xml.responseXML;
  const registros = xmlDoc.getElementsByTagName("registro");
  let contenido="<thead><tr><th>Ciudad</th><th>Temperatura(º)</th><th>Humedad(%)</th><th>Presión</th><th>Viento</th><th>Color</th></tr></thead><tbody>";
  for (let i = 0; i <registros.length; i++) { 
    contenido += "<tr><td>" +
      registros[i].getElementsByTagName("ciudad")[0].textContent +
      "</td><td>" +
      registros[i].getElementsByTagName("temperatura")[0].textContent +
      "</td><td>" +
      registros[i].getElementsByTagName("humedad")[0].textContent +
      "</td><td>" +
      registros[i].getElementsByTagName("presion")[0].textContent +
      "</td><td>" +
      registros[i].getElementsByTagName("viento")[0].textContent +
      "</td><td>" +
      registros[i].getElementsByTagName("color")[0].textContent +
      "</td></tr>";
  }
  contenido += "</tbody>";

  const $tablaPag1 = $('#pagina1 table');
  $tablaPag1.html(contenido);
  formatearTabla($tablaPag1);
}

//Envío de datos JSON
function loadJson() {
    $.getJSON("pagina2.json", function(datos) {
        let contenido = tabla_json(datos);
        const $tablaPag2 = $('#pagina2 table');
        $tablaPag2.html(contenido);
        formatearTabla($tablaPag2);
    });
}


function tabla_json(json)
{
  let contenido="<thead><tr><th>Ciudad</th><th>Temperatura(º)</th><th>Humedad(%)</th><th>Presión</th><th>Viento</th><th>Color</th></tr></thead><tbody>";
  for (let i = 0; i < json.ciudad.length; i++) {
    contenido += "<tr>" +
    "<td>" + json.ciudad[i] + "</td>" +
    "<td>" + json.temperatura[i] + "</td>" +
    "<td>" + json.humedad[i] + "</td>" +
    "<td>" + json.presion[i] + "</td>" +
    "<td>" + json.viento[i] + "</td>" +
    "<td>" + json.color[i] + "</td>" +
    "</tr>";
    }
    contenido += "</tbody>";
    return contenido
}

//Visualización historiograma
const titulos = {
      "#temp": "Temperatura (º)",
      "#hum": "Humedad (%)",
      "#pres": "Presión",
      "#viento": "Viento"
  };

const columnas = { "#temp": 1, "#hum": 2, "#pres": 3, "#viento": 4 };
function historiograma(casilla)
{
  let filas = $('.pagina-tabla:visible tbody tr'); //Realizamos el historiograma con los datos de la tabla seleccionada
  let contenidoHistograma = "";
  let indice= columnas[casilla];
  for (let i=1; i<filas.length; i++)
  {
    let ciudad = filas[i].cells[0].innerText; //Seleccionamos el contenido de la columna ciudad
    let valor = filas[i].cells[indice].innerText; //Estraemos el valor de la columna seleccionada

    contenidoHistograma += "<tr>";
    contenidoHistograma += "<td>" + ciudad + "</td>";
    contenidoHistograma += "<td class='contendor-barras'>" + crearBarra(valor, indice) + "</td>";
    contenidoHistograma += "</tr>";
  }
  $('#titulo-histograma').text(titulos[casilla]);
  $('#cuerpo-histograma').html(contenidoHistograma);
  $('#seccion-histograma').show();
}

function crearBarra(valor, param)
{
  if (param == 2) //La humedad ya se expresa en porcentaje
  {

  }
  else //Para las otras variables hay que convertir a porcentaje 
  {

  }
}
