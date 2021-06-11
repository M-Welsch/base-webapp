function onPageLoad() {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("logfile_index");
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        let logfileIndex = JSON.parse(event.data)
        updateLogfileIndex(logfileIndex);
        onLogSelect();
    };
}

function onLogSelect() {
    let element = document.getElementById("log-select");
    let value = element.options[element.selectedIndex].value;

    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("request_logfile: " + value);
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        let logfileLines = JSON.parse(event.data)
        updateLogfileLines(logfileLines);
    };
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