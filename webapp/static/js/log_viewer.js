function onPageLoad() {
    sendMessageToBcu(
        '{"code": "logfile_index"}',
        function(answer) {
            let logfileIndex = JSON.parse(answer)
            updateLogfileIndex(logfileIndex);
            onLogSelect();
        }
    );
}

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
    for (let i = 0; i < logfileIndex.length; i++) {
        select.innerHTML += "<option value="+logfileIndex[i]+">"+logfileIndex[i]+"</option>";
    }
}

function updateLogfileLines(logfileLines) {
    let textarea = document.getElementById("log-view-detailed");
    textarea.innerHTML = "";
    for (let i = 0; i < logfileLines.length; i++) {
        textarea.innerHTML += logfileLines[i];
    }
    textarea.setAttribute("rows", logfileLines.length)
}