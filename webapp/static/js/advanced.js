function onPageLoad() {}

function buttonSignal(message_code) {
    let message = {"code": message_code};
    sendMessageToBcu(JSON.stringify(message));
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


function setBrightness() {
    let brightness = document.getElementById("slider-brightness").value;
    document.getElementById("brightness-value").innerHTML = brightness;
    let message = {"code": "display_brightness", "payload": brightness};
    sendMessageToBcu(JSON.stringify(message));
}

function onDisplayTextSend() {
    let line1 = document.getElementById("display-line-1").value;
    let line2 = document.getElementById("display-line-2").value;
    let message = {"code": "display_text", "payload" : {"line1": line1, "line2": line2}};
    sendMessageToBcu(JSON.stringify(message));
}
