function buttonSignal(message_code) {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send(message_code);
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };
}

function displayAdvancedData( current_status ) {
    document.getElementById("button-dock").disabled = current_status["docked"];
    document.getElementById("button-undock").disabled = !current_status["docked"];
    populateDiagnoseTable( current_status["diagnose"] );
}

function populateDiagnoseTable( data ) {
    function appendSpan(text, suffix="") {
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(text + suffix));
        table.appendChild(span);
    }

    let table = document.getElementById("diagnose-container");
    table.innerHTML = "";

    for (const [key, value] of Object.entries(data)) {
        appendSpan(key, ":");
        appendSpan(value);
    }
}