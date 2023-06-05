import { sendMessageToBcu } from "./modules/message/json/JsonMessenger.js";

(function onPageLoad() {
    let message = {"code": "logfile_index"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            let logfileIndex = JSON.parse(answer)
            updateLogfileIndex(logfileIndex);
            onLogSelect();
        }
    );
    const logSelectElement = document.getElementById("log-select");
    if (logSelectElement)
        logSelectElement.addEventListener("change", onLogSelect);
})()

function onLogSelect() {
    let element = document.getElementById("log-select");
    let value = element.options[element.selectedIndex].value;
    let message = {"code": "request_logfile", "payload": value};

    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            let logfileLines = JSON.parse(answer)
            updateLogfileLines(logfileLines);
        }
    );
}

function updateLogfileIndex(logfileIndex) {

    let select = document.getElementById("log-select");

    select.innerHTML = "";

    logfileIndex.map(getLogfileSelectOption).forEach(addOptionToSelect);

    function getLogfileSelectOption(optionValue) {

        var optionElement = document.createElement("option");
        optionElement.value = optionValue;
        optionElement.textContent = optionValue;

        return optionElement;

    }

    function addOptionToSelect(option) {
        
        select.add(option);

    }

}

function updateLogfileLines(logfileLines) {
    console.log(logfileLines)
    let textarea = document.getElementById("log-view-detailed");
    textarea.textContent = "";
    const logfileContent = logfileLines.join("");
    textarea.textContent = logfileContent;
    textarea.setAttribute("rows", logfileLines.length)
}