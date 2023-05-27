function operate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "x":
            return num1 * num2;
        case "÷":
            return num1 / num2;
        default:
            return "";
    }
}

//Variables
let currentNumber = "0";
let lastNumber = "0";
let operator = null;
let currentText = "0";

let operatorName = null;
let operatorSign = null;

//Obtiene los elementos necesarios
const currentScreen = document.getElementById("screen-current");
const lastScreen = document.getElementById("screen-last");
const numBtn = document.querySelectorAll("#number");
const clearBtn = document.getElementById("clearButton");
const deleteBtn = document.getElementById("deleteButton");
const operatorsBtn = document.querySelectorAll("#operator");
const equalBtn = document.querySelector("#equal");
const dotBtn = document.querySelector("#dot");

//Valor inicial del screen
currentScreen.textContent = "0";

//Display para cada numero
Array.from(numBtn).forEach((button) => {
    button.addEventListener("click", () => {

        currentNumber = button.getAttribute("data-number");

        if (currentText === "0") {
            currentText = currentNumber;
        } else {
            currentText += currentNumber;
        }

        currentScreen.textContent = currentText;
    })
});


// Clear button
clearBtn.addEventListener("click", () => {
    clearCalculator();
});

// Función para reiniciar la calculadora
function clearCalculator() {
    currentScreen.textContent = "0";
    lastScreen.textContent = "";
    currentNumber = "0";
    lastNumber = "0";
    currentText = "0";
    calculation.length = 0;
    operator = null;
}


// Delete button
deleteBtn.addEventListener("click", () => {
    deleteLastDigit();
});

// Función para borrar el último dígito
function deleteLastDigit() {
    if (currentNumber.length > 0) {
        currentText = currentText.substring(0, currentText.length - 1);
        currentScreen.textContent = currentText;
    }

    if (currentText === "") {
        currentScreen.textContent = "0";
    }
}

let isResultDisplayed = false;

//Array para almacenar todas las operaciones
const calculation = [];

//Agrega el numero y el operador al array
Array.from(operatorsBtn).forEach((button) => {
    button.addEventListener("click", () => {
        operatorName = button.getAttribute("data-operator");
        operatorSign = button.getAttribute("data-number");

        //Codigo nuevo
        if (isResultDisplayed) {
            lastScreen.textContent = "";
        }
        isResultDisplayed = false;
        //Codigo nuevo

        if (currentText !== "0") {
            calculation.push(currentText);
            calculation.push(operatorSign);

            lastScreen.textContent = `${lastScreen.textContent} ${currentText} ${operatorSign}`;
            currentText = "0";
            isSecondClick = true;
        }
    });
})

//Realiza la operacion de manera consecutiva
function doCalculation() {
    calculation.push(parseFloat(currentText)); // Agregar el último número ingresado a la matriz

    let result = calculation[0];
    for (let i = 1; i < calculation.length; i += 2) {
        const operator = calculation[i];
        const number = calculation[i + 1];

        result = operate(result, number, operator); // Realizar la operación
    }

    return result;
}

//Funcion para mostrar el resultado
function displayResult() {
    const result = doCalculation();
    currentScreen.textContent = result;
}

//Muestra el resultado al apretar el boton igual
equalBtn.addEventListener("click", () => {
    const equalSign = equalBtn.getAttribute("data-number");

    displayResult();
    lastScreen.textContent = `${lastScreen.textContent} ${currentText} ${equalSign}`;
    calculation.length = 0; // Reiniciar la matriz de cálculo
    currentText = currentScreen.textContent;
    isResultDisplayed = true;

});

//Dot button
dotBtn.addEventListener("click", () => {
    const dot = dotBtn.getAttribute("data-number");

    if (!currentText.includes(dot)) {
        currentText += dot;
        currentScreen.textContent = currentText;
    }
});

// Evento de teclado keydown
document.addEventListener("keydown", (event) => {
    const key = event.key;

    switch (key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            // Teclas numéricas: Actualizar currentText y mostrar en la pantalla
            currentNumber = key;

            if (currentText === "0") {
                currentText = currentNumber;
            } else {
                currentText += currentNumber;
            }

            currentScreen.textContent = currentText;
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            // Teclas de operadores: Realizar operación si es la segunda vez, de lo contrario, almacenar el operador

            //Codigo nuevo
            if (isResultDisplayed) {
                lastScreen.textContent = "";
            }
            isResultDisplayed = false;
            //Codigo nuevo

            operatorSign = key;
            if (operatorSign === "/") {
                operatorSign = "÷"; // Cambiar el símbolo "/" por "÷"
            }
            if (operatorSign === "*") {
                operatorSign = "x";
            }
            calculation.push(currentText, operatorSign);
            lastScreen.textContent += ` ${currentText} ${operatorSign.trim()}`;
            currentText = "0";


            break;
        case "=":
        case "Enter":
            // Tecla igual o Enter: Mostrar resultado
            const equalSign = equalBtn.getAttribute("data-number");
            const result = doCalculation();
            currentScreen.textContent = result;
            
            lastScreen.textContent = `${lastScreen.textContent} ${currentText} ${equalSign}`;
            calculation.length = 0;
            currentText = currentScreen.textContent;
            isResultDisplayed = true;
            break;
        case "Backspace":
            // Tecla de retroceso: Eliminar último dígito
            deleteLastDigit();
            break;
        case "Delete":
            // Tecla Supr: Reiniciar calculadora
            clearCalculator();
            break;
        default:
            // Otras teclas: No hacer nada
            break;
    }
});
