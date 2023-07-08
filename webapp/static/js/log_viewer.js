import LogViewerClient from "./modules/log_viewer/LogViewerClient.js";
import { onElementChange } from "./modules/utils/ElementUtils.js";

(function onPageLoad() {

    let logViewerClient = new LogViewerClient();
    
    logViewerClient.requestLogFileIndex(function onLogFileIndexReceive (logfileIndex) {

        updateLogfileIndex(logfileIndex);
        onLogSelect();

    });

    const logSelectElement = document.getElementById("log-select");
    onElementChange(logSelectElement, onLogSelect);

})()

function onLogSelect() {

    let element = document.getElementById("log-select");
    let selectedLogFile = element.options[element.selectedIndex].value;
    let logViewerClient = new LogViewerClient();
    logViewerClient.requestLogFile(selectedLogFile, updateLogfileLines);

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

    let textarea = document.getElementById("log-view-detailed");
    textarea.textContent = "";

    const logfileContent = logfileLines.join("");

    textarea.textContent = logfileContent;
    textarea.setAttribute("rows", logfileLines.length)

}