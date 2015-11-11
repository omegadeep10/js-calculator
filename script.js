//setup calcScreen variable
var calcScreen = document.getElementById("screen");

//event listener to calculate math if enter key is pressed
calcScreen.addEventListener("keydown", function(key) {
    if (key.keycode === 13 || key.which === 13) {
        console.log(calcScreen.value);
    }
});


//event listener to calculate math if "=" button is pressed


//event listeners to watch for button presses and append the button value to screen
