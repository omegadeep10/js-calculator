//get screen info and store in "calcScreen" variable
var calcScreen = document.getElementById("screen");

//get eval button and store into "evaluate" variable
var evaluate = document.getElementById("eval");

//get clear button and store into "clear" variable
var clear = document.querySelector(".button.clear");


//event listener to calculate math if eval button is clicked
evaluate.addEventListener("click", calcMath);
clear.addEventListener("click", clearScreen);

//Get a list of all buttons that are regular keys (0-9) or operators (+,-,*,/) [See NOTE 1]
var buttonsList = document.querySelectorAll(".button.key, .button.operators");

//loop through each button and add an event listener to call the punchKey function [See NOTE 2]
for (var i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener("click", punchKey);
}


//function that actually calculates the math
function calcMath() {
    console.log(calcScreen.value);
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
    console.log(buttonValue);
    calcScreen.value = calcScreen.value + buttonValue;
}

function clearScreen() {
    calcScreen.value = "";
}

//Use this function to clean any unacceptable characters from the input field
function sanitizeInput(input) {
    var acceptedChars = /[^0-9+\-*\/\.\^]/g;
    var sanitizedInput = input.replace(acceptedChars, "");
    return sanitizedInput;
}



/*
        --------NOTES---------
        - These are just brief explanations of certain lines of code that I think are important to understand.

        ---NOTE 1---
        The "buttonsList" variable uses the querySelectorAll method to get a list of every element in the document that has both the button and key classes, AND the button and operator
        classes. This is for simplicity, because attaching an event listener to every single button individually is too much work, and I'm lazy. It also setups the for loop that
        follows it afterwards.

        ---NOTE 2---
        This for loop loops through every item in the "buttonsList" and adds an event listener to each item. The event listener listens for a click event and does the "punchKey"
        function. I choose this method instead of other more efficient methods because it is easier to understand. In the future, we might want to change this to the method
        outlined here: http://www.kirupa.com/html5/handling_events_for_many_elements.htm

        ---NOTE 3---
        This event listens for the user pressing the enter key while the calculator screen is active. Note that the function isn't called by anything this JavaScript file, instead
        the screen html element calls this function directly every time the user presses any key in the input box. I know it's not very clean to have javascript code cluttering the
        html file, so we should probably fix this later.

<<<<<<< HEAD
        ---NOTE 4---
        This is the function that's called by the regular keys and operators. It basically adds the value of each key/operator that called it to the calcScreen value. So for example,
        if the "7" key called this function, it would add "7" to the calcScreen value, which would be updated and displayed accordingly. IMPORTANT: It uses the "name" attribute that
        is in each button html element, not the html tag's value itself. The reason for this is so the UI of each button can be separate from the functional side of the calculator.
        For example, the multiplication button uses "x" to represent the multiplication operator. However, when the user clicks that button, it adds "*" to the screen instead of
        "x" because JavaScript understands "*" as the multiplication operator. We could PROBABLY use regex to replace each "x" with "*" but honestly, we can do it later, once the
        calculator is actually functional.
 */
//event listeners to watch for button presses and append the button value to screen


