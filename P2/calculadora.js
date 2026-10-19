//Vamos a obtener los elementos de la calculadora según sean pulsados:
const pantalla = document.getElementById("pantalla");
//Calculadora
const AC = document.getElementById("AC");
const DEL = document.getElementById("DEL");
const div = document.getElementById("/");
const mult = document.getElementById("x");
const resta = document.getElementById("-");
const suma = document.getElementById("+");
const igual = document.getElementById("=");
const signo = document.getElementById("+/-");
const coma = document.getElementById(".");
//Conversión por pantalla
const udOrigen = document.getElementById("udOrigen");
const udDestino = document.getElementById("udDestino");
const conv = document.getElementById("conv");

//VARIABLES (usamos let para no declarar dos veces la misma variable)
let n1 = "";
let n2 = "";
let funcion = "";
//Para que no se acumulen los números en el igual

//Vamos a definir una variable para almacenar el segundo número de la operación
//Cuando pulsemos el botón de alguna operación tomará el valor true
let segundoNum = false;
//Para funcion igual
let resultadoMostrado = false;

//Para posibles errores
let error = false;

let a = "";
let b = "";
let result = "";
//Para la conversión
let udActual= "C";

//Mostrar el número con sus unidades
function unidades(valor)
{
    let simbolo = "";

    if (udActual === "C")
    {
        simbolo = "°C";
    }
    else if (udActual === "F")
    {
        simbolo = "°F";
    }
    else if (udActual === "K")
    {
        simbolo = "K";
    }

    pantalla.textContent = valor + " " + simbolo;
}

//Reiniciar calculadora, creamos esta función ya que la usaremos en numeradas ocasiones a lo largo del código
function reiniciar()
{
    n1 = "";
    n2 = "";
    funcion = "";
    segundoNum = false;
    resultadoMostrado = false;
    error = false;

    a = "";
    b = "";
    result = "";

    udActual = udOrigen.value;
}

//Botones
//Almacenar el número, para for podemos inicializar la variable dentro del mismo
for (let i = 0; i<=9; i++)
{
    document.getElementById(i).addEventListener("click", function()
    {
            if (resultadoMostrado === true || error === true)
            {
                reiniciar();
            }
            if (segundoNum === false)
            {
                n1 = n1 + i;
                pantalla.textContent = n1;
            }
            else //introducimos el segundo número
            {
                n2 = n2 + i;
                pantalla.textContent = n2;
            }
    });
}

//OPERACIONES
//SUMA
suma.addEventListener("click", function()
{
    //Comprobamos que no haya error
    if (n1 === "" || error === true)
    {
        return;
    }

    funcion = "+";
    //Cambiamos el valor para introducir un segundo número
    segundoNum = true;
    resultadoMostrado = false;
    //Borramos un posible segundo número para que no se almacenen
    n2 = "";
});

//RESTA
resta.addEventListener("click", function()
{
    if (n1 === "" || error === true)
    {
        return;
    }
    funcion = "-";
    segundoNum = true;
    resultadoMostrado = false;
    
    n2 = "";
});

//MULTIPLICACION
mult.addEventListener("click", function()
{
    if (n1 === "" || error === true)
    {
        return;
    }
    funcion = "x";
    segundoNum = true;
    resultadoMostrado = false;

    n2 = "";
});

//DIVISION
div.addEventListener("click", function()
{
    if (n1 === "" || error === true)
    {
        return;
    }
    funcion = "/";
    segundoNum = true;
    resultadoMostrado = false;

    n2 = "";
});

//IGUAL
igual.addEventListener("click", function()
{
    //Debemos comprobar que hay una operación
    if (n1 === "" || n2 === "" || funcion === "" || error === true)
    {
        pantalla.textContent = "Operación incompleta";
        error = true;
        return;
    }
    a = Number(n1);
    b = Number(n2);

    if (funcion === "+")
    {
        result = a + b;
    }
    else if (funcion === "-")
    {
        result = a - b;
    }
    else if (funcion === "x")
    {
        result = a * b;
    }
    else if (funcion === "/")
    {
        if (b === 0) //En caso de que el denominador sea 0
        {
            pantalla.textContent = "Error";
            error = true;
            return;
        }
        else
        {
            result = a / b;
        }
    }

    //Comprobamos que sea un número válido
    if (!Number.isFinite(result))
    {
        pantalla.textContent = "Error de cálculo";
        error = true;
        return;
    }

    //Mostrar el resultado
    unidades(result);

    
    //Para una operación nueva
    n1 = String(result);
    n2 = "";
    funcion = "";
    segundoNum = false;
    //Pulsamos igual
    resultadoMostrado = true;
});

//AC: borrar todo lo escrito
AC.addEventListener("click", function () {

    reiniciar();
    pantalla.textContent = "";
});

//DEL: borramos lo último que ha sido escrito
DEL.addEventListener("click", function () {

    if (error === true)
    {
        reiniciar();
        pantalla.textContent = "";
        return;
    }
    //Borrar el último dígito del resultado
    if (resultadoMostrado === true)
    {
        resultadoMostrado = false;
    }
    if (segundoNum === false) 
    {
        n1 = n1.slice(0, -1);
        pantalla.textContent = n1;
    } 
    else 
    {
        n2 = n2.slice(0, -1);
        pantalla.textContent = n2;
    }

});

// +/−: Cambio de signo
signo.addEventListener("click", function () {

    if (error === true)
    {
        return;
    }

    if (segundoNum === false)
    {
        //Comprobamos que exista un número
        if (n1 === "")
        {
            return;
        }

        if (n1.startsWith("-"))
        {
            n1 = n1.substring(1);
        }
        else
        {
            n1 = "-" + n1;
        }

        pantalla.textContent = n1;

        //Permite seguir operando con el número modificado
        resultadoMostrado = false;
    }
    else
    {
        if (n2 === "")
        {
            return;
        }

        if (n2.startsWith("-"))
        {
            n2 = n2.substring(1);
        }
        else
        {
            n2 = "-" + n2;
        }

        pantalla.textContent = n2;
    }

});

//Coma: Para introducir decimales
coma.addEventListener("click", function () {
    
    if (error === true)
    {
        reiniciar();
    }
    if (resultadoMostrado === true)
    {
        reiniciar();
    }
    if (segundoNum === false) {

        if (!n1.includes("."))
        {
            //Si no hay número, empezamos por 0.
            if (n1 === "")
            {
                n1 = "0.";
            }
            else
            {
                n1 = n1 + ".";
            }
        }

        pantalla.textContent = n1;

    } else {

       if (!n2.includes("."))
        {
            if (n2 === "")
            {
                n2 = "0.";
            }
            else
            {
                n2 = n2 + ".";
            }
        }
        pantalla.textContent = n2;

    }

});

//Conversión de temperaturas por pantalla
conv.addEventListener("click", function(){
//Comprobar que no está vacío
if (n1 === "" ||  error === true)
{
    pantalla.textContent = "Introduzca una temperatura";
    error = true;
    return;
}
//Si hay una operación pendiente
if (funcion !== "")
    {
        pantalla.textContent = "Finalice la operación antes de convertir";
        return;
    }


//Ahora vamos a tomar el valor de la tempratura para convertirlo
let temp= Number(n1); //Convertimos a número
//Obtenemos el origen y el destino
let origen = udActual;
let destino = udDestino.value;

//Suponemos que partimos de grados Celsius y transformamos a Celsius
let celsius;

if (origen === "C")
{
    celsius = temp;
}
else if (origen === "F")
{
    celsius = (temp -32)*5/9;
}
else if (origen === "K")
{
    celsius = temp - 273.15;
}
//Conversión de Celsius a destino
let result;
let simbolo;

if (destino === "C")
{
    result = celsius;
    simbolo = "ºC"
}
else if (destino === "F")
{
    result = celsius*(9/5) + 32;
    simbolo = "ºF"
}
else if (destino === "K")
{
    result = celsius + 273.15;
    simbolo = "K"
}


//Cambio de unidad de origen
udOrigen.addEventListener("change", function()
{
    reiniciar();
    pantalla.textContent = "";
});
//Comprobar que no sea inferior al cero absoluto
if (celsius < -273.15)
{
    pantalla.textContent = "Temperatura inferior al cero absoluto";
    error = true;
    return;
}

//Guardamos el resultado y actualizar
n1 = String(result);
n2 = "";
funcion = "";
segundoNum = false;
udOrigen.value = destino; 
udActual = destino;
pantalla.textContent = result + " " + simbolo;
resultadoMostrado = true;
});

