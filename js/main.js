// Define the Calculator class which will encapsulate all calculator operations and behaviors.
class Calculator {
    // Constructor initializes default state of the calculator.
    constructor() {
        // Set the default value of the calculator's display.
        this.displayValue = '0';
        // Cache the DOM element that displays the calculator's output to ensure efficient updates.
        this.displayElement = document.querySelector('.display');
        // Display the default value to the user.
        this.updateUI();
    }
    // Utility method to synchronize the UI with the internal state of the calculator.
    updateUI() {
        this.displayElement.innerText = this.displayValue;
    }
    // Reset the calculator display to its initial state.
    clear() {
        this.displayValue = '0';
        this.updateUI();
    }
    // Update the displayed value based on user input.
    updateDisplay(char) {
        // Handle the special case where the display is at its initial state.
        // Allow arithmetic operators to be appended after 0.
        // Otherwise, replace the initial 0 with the character or append the character.
        // ...
        if (this.displayValue === '0' && ['+', '-', '*', '/', '(', ')', '|'].includes(char)) {
            this.displayValue += ` ${char} `;
        } else if (this.displayValue === '0') {
            this.displayValue = String(char);
        } else {
            this.displayValue += char;
        }
        // Update the UI after modifying the internal state.
        this.updateUI();
    }
    // Evaluate the arithmetic expression displayed on the calculator.
    evaluate(operation) {
        const chars = this.displayValue.split('');

        for (let i = 0; i < chars.length; i++) {
            if (chars[i] in encodeURL) {
                chars[i] = encodeURL[chars[i]]
            }
        }
        const expression = chars.join("");
        const url = `https://newton.now.sh/api/v2/${operation}/${expression}`;

        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
                this.displayValue = `${data.result}`;
                this.updateUI();
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
    }
    // Handle the addition of the decimal point to the display.
    addDot() {
        // Check how many decimal points are currently in the display.
        // If there's less than 2 and the last character isn't a decimal point, add a new one.
        // ...
        const dotCount = (this.displayValue.match(/\./g) || []).length;
        if (dotCount < 2 && this.displayValue[this.displayValue.length - 1] !== '.') {
            this.updateDisplay('.');
        }
    }
}
// Create a new Calculator instance.
const calc = new Calculator();
// Attach event listeners for calculator functionalities:

// Clear the calculator's display when the clear button is clicked.
document.querySelector('.clear-btn').addEventListener('click', () => calc.clear());
// Add a decimal point to the current number on the display.
document.querySelector('#dot').addEventListener('click', () => calc.addDot());
// Evaluate the current expression on the display when the equals button is clicked.
document.querySelector('#equals').addEventListener('click', () => calc.evaluate());

// Define a mapping of DOM elements to their respective arithmetic operations.
const operators = {
    '#add': ' + ',
    '#subtract': ' - ',
    '#multiply': ' * ',
    '#divide': ' / ',
    '#leftParen': '(',
    '#rightParen': ')',
    '#verticalBar': '|',
    '#power': '^',
    '#colon': ':',
    '#x': 'x',
    '#y': 'y',
};

// Each character (or string) encoding for use in a URL
const encodeURL = {
    " ": "%20",
    "!": "%21",
    "\"": "%22",
    "#": "%23",
    "$": "%24",
    "%": "%25",
    "&": "%26",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "*": "%2A",
    "+": "%2B",
    ",": "%2C",
    "-": "%2D",
    ".": "%2E",
    "/": "%2F",
    ":": "%3A",
    ";": "%3B",
    "<": "%3C",
    "=": "%3D",
    ">": "%3E",
    "?": "%3F",
    "@": "%40",
    "[": "%5B",
    "\\": "%5C",
    "]": "%5D",
    "^": "%5E",
    "_": "%5F",
    "`": "%60",
    "{": "%7B",
    "|": "%7C",
    "}": "%7D",
    "~": "%7E"
}

// Loop through each operator button and attach an event listener.
// On click, the respective arithmetic operation is appended to the display.
for (const [key, value] of Object.entries(operators)) {
    document.querySelector(key).addEventListener('click', () => calc.updateDisplay(value));
}
// For each numeric button (0-9), attach an event listener.
// Append the respective number to the display when clicked.
for (let i = 0; i <= 9; i++) {
    document.querySelector(`#num${i}`).addEventListener('click', () => calc.updateDisplay(i));
}

// Modal JS
let modal = document.getElementById("myModal");
let btn = document.getElementById("advancedFunctions");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}