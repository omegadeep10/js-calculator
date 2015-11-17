var calcScreen = document.getElementById("screen");   //get screen
var evaluate = document.getElementById("eval");   //get "=" button
var clear = document.querySelector(".button.clear");   //get "C" button


//calculates math if "=" button is clicked
evaluate.addEventListener("click", calcMath);
//clears screen if "C" button is clicked
clear.addEventListener("click", clearScreen);
//Gets list of all buttons that are keys or operators
var buttonsList = document.querySelectorAll(".button.key, .button.operators");

for (var i = 0; i < buttonsList.length; i++) {
    //on button click, add the button's value to the screen
    buttonsList[i].addEventListener("click", punchKey);
}



//Bring cursor focus to calcScreen to minimize interactions.
calcScreen.focus();




//function that actually calculates the math
function calcMath() {
    var solution = sanitizeInput(calcScreen.value);   //sanitize input
    var output = eval(solution);   //calculate math using eval
    
    //output the result onto the screen if it's valid
    if (output) {
        calcScreen.value = output;
    }
    else {
        calcScreen.value = "Bad Input - Try Again.";
    }
}

//called by screen; checks if key pressed = enter and calls calcMath function [See NOTE 3]
function handleKeyPress(event) {
    if (event.which === 13 || event.keyCode === 13) {
        calcMath();
    }
}

//adds the value of the key that calls this function to the calcScreen [See NOTE 4]
function punchKey() {
    //get the name of the button that calls this function
    var buttonValue = this.name;
    calcScreen.value = calcScreen.value + buttonValue;
}

//clears anything on the screen
function clearScreen() {
    calcScreen.value = "";
}

//Use this function to clean any unacceptable characters from the input field
function sanitizeInput(input) {
    var acceptedChars = /[^0-9+\-*\/\.\^]/g;   //regexp of accepted characters
    var sanitizedInput = input.replace(acceptedChars, "");

    return sanitizedInput;
}
