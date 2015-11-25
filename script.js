var calcScreen = document.getElementById("screen");   //get screen
var evaluate = document.getElementById("eval");   //get "=" button
var clear = document.querySelector(".button.clear");   //get "C" button
var messageBox = document.getElementById("messageText");   //get messagebox
var deleteKey = document.querySelector(".button.backspace"); //get backspace key
var historyDiv = document.getElementById("history"); //get history div


//event listener to calculate math if eval button is clicked
evaluate.addEventListener("click", calcMath);
//clears screen if "C" button is clicked
clear.addEventListener("click", clearScreen);
//deletes last character entered into calculator screen
deleteKey.addEventListener("click", deleteLastCharacter);



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
    var expression = sanitizeInput(calcScreen.value);   //sanitize input
    var output;  //initialize output here, so both the try/catch and if/else later can use it
    
    //Try/Catch statement to handle the eval function crashing
    try {
        output = eval(expression);   //calculate math using eval
    }
    catch(err) {
        console.log("Eval failed: Invalid Input");
    }



    //output the result onto the screen if it's valid
    if (output) {
        calcScreen.value = output;
        
        //clear messageBox if we have clean output.
        messageBox.innerHTML = "";
        messageBox.className = "";

        //add expression and output to the history
        addToHistory(expression, output);
        //remove first child if number of elements is greater than 9
        if (historyDiv.children.length > 10) {
            historyDiv.removeChild(historyDiv.getElementsByTagName("p")[0]); //get first "p" element and remove it
        }
    }
    else {
        // Return sanitized version on expression to aid user.
        calcScreen.value = expression;   
        messageBox.innerHTML = "Bad Input";
        messageBox.className = "active";
    }

    calcScreen.focus();
}



/*

    ALL FUNCTIONS BELOW

 */


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
    calcScreen.focus();
}




//clears anything on the screen
function clearScreen() {
    calcScreen.value = "";
    messageBox.className = "";
    calcScreen.focus();
}




//Use this function to clean any unacceptable characters from the input field
function sanitizeInput(input) {
    
    var acceptedChars = /[^0-9\+\-\*\/\.\^\(\)]+/g;   //regexp of accepted characters
    var sanitizedInput = input.replace(acceptedChars, "");

    return sanitizedInput;
}

//deletes last character from input field
function deleteLastCharacter() {
    calcScreen.value = calcScreen.value.slice(0, calcScreen.value.length - 1);  //sets calcScreen to whatever it was before with the last character removed
    calcScreen.focus();
}


function addToHistory(expression, output) {
    historyDiv.innerHTML += "<p><span class=\"history item\">"+ expression + "</span> = <span class=\"history answer\">" + output + "</span></p>";
}