//Gets HTML elements
const stringInputBox = document.getElementById('stringInput');
const regexInputBox = document.getElementById('regexInput');
const resultOutputBox = document.getElementById('highlightedDisplay');

//Event Handling - run highlighting at every change of input
stringInputBox.addEventListener('input', Highlight);
regexInputBox.addEventListener('input', Highlight);

//Highlighting function
function Highlight() {
        //Get Inputs
        let text = stringInputBox.value;
        let patternInput = regexInputBox.value.trim();
        let pattern, flags;

        //Ignores if pattern is nothing
        if (patternInput == '') {
                display(text);
                return;
        }

        //Seperates Regex & flags
        let matches = patternInput.match(/^\/?(.+?)\/([gimsuy]*)$/);
        //Assigns the Regex & flags variable
        pattern = matches ? matches[1] : patternInput;
        flags = matches ? matches[2] : ''

        //Create Regex Pattern & Warns if Poorly Written
        try {
                //Create Regexp
                const regex = new RegExp(pattern, flags);
                //Generate Highlighted Text
                display(text.replace(regex, match => `<mark>${match}</mark>`));
        } catch (error) {
                //Sets result to the plain text if regex is invalid
                display(text);
        }
}

function display(txt) {
        resultOutputBox.innerHTML = txt;
}