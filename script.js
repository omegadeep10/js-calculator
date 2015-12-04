var calcScreen = document.getElementById("screen");   //get screen
var evaluate = document.getElementById("eval");   //get "=" button
var clear = document.querySelector(".button.clear");   //get "C" button
var messageBox = document.getElementById("messageText");   //get messagebox
var deleteKey = document.querySelector(".button.backspace"); //get backspace key
var historyDiv = document.getElementById("history"); //get history div
var buttonsList = document.querySelectorAll(".button.key, .button.operators"); //get array of all buttons


//event listener to calculate math if eval button is clicked
evaluate.addEventListener("click", calcMath);
//clears screen if "C" button is clicked
clear.addEventListener("click", clearScreen);
//deletes last character entered into calculator screen
deleteKey.addEventListener("click", deleteLastCharacter);
//add event listener to historyDiv to listen for clicks on "span" elements using event bubbling. (see function)
historyDiv.addEventListener("click", clickHistoryItem, false);

//Add event listener to every .button.key and .button.operator
for (var i = 0; i < buttonsList.length; i++) {
    //on button click, add the button's value to the screen
    buttonsList[i].addEventListener("click", punchKey);
}

//event listener on entire document so user can enter values using keyboard
document.addEventListener("keypress", keyboardInput, false);







/*

    ALL FUNCTIONS BELOW

 */
function keyboardInput(event) {
    console.log(event.which);
    var characterCode = event.charCode || event.keyCode;
    var fullButtonsList = document.querySelectorAll(".button");
    
    if (characterCode === 99) {
        clearScreen();
    }
    else if (characterCode === 8) {
        deleteLastCharacter();
    }
    else if (characterCode === 13) {
        calcMath();
    }
    else {
        for (var i = 0; i < fullButtonsList.length; i++) {
            var currentElementKeycode = parseInt(fullButtonsList[i].getAttribute("data-keycode"));
            if (currentElementKeycode === characterCode) {
                calcScreen.innerHTML = calcScreen.innerHTML + fullButtonsList[i].name;
                console.log(fullButtonsList[i].name);
                break;
            }
        }
    }
    event.stopPropagation();
}


//function that actually calculates the math
function calcMath() {
    var expression = sanitizeInput(calcScreen.innerHTML);   //sanitize input
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
        calcScreen.innerHTML = output;
        
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
        calcScreen.innerHTML = expression;   
        messageBox.innerHTML = "Bad Input";
        messageBox.className = "active";
    }
}


//adds the value of the key that calls this function to the calcScreen [See NOTE 4]
function punchKey() {
    //get the name of the button that calls this function
    var buttonValue = this.name;
    calcScreen.innerHTML = calcScreen.innerHTML + buttonValue;
    calcScreen.focus();
}




//clears anything on the screen
function clearScreen() {
    calcScreen.innerHTML = "";
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
    calcScreen.innerHTML = calcScreen.innerHTML.slice(0, calcScreen.innerHTML.length - 1);  //sets calcScreen to whatever it was before with the last character removed
    calcScreen.focus();
}


function addToHistory(expression, output) {
    historyDiv.innerHTML += "<p><span class=\"history item\">"+ expression + "</span> = <span class=\"history answer\">" + output + "</span></p>";
}


//replaces content of the calcScreen with the content of the clicked span
function clickHistoryItem(event) {
    var element = event.target;   //element that was clicked


    //checks to make sure the element that was clicked was a span
    if (element.nodeName.toLowerCase() === "span") {
        calcScreen.innerHTML = event.target.innerHTML;  //replace calcScreen value with content from the clicked span
    }
    event.stopPropagation();  //stops the event from propagating up the tree
}