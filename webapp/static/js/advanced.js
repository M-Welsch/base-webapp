import { BcuMessenger } from "./modules/message/BcuMessenger.js";
import { onElementChange, onElementClick } from "./modules/utils/ElementUtils.js";

function onPageLoad() { }

function setup() {
    var buttonSignalMapping = {
        "button-dock": "dock",
        "button-undock": "undock",
        "button-power": "power",
        "button-unpower": "unpower",
        "button-mount": "mount",
        "button-unmount": "unmount",
        "button-shutdown": "shutdown"
    }

    for (const [id, onClick] of Object.entries(buttonSignalMapping)) {
        var button = document.getElementById(id);
        onElementClick(button, buttonSignal(onClick));
    }

    var brightnessSlider = document.getElementById("slider-brightness");

    if (brightnessSlider) {
        setBrightness();
        onElementChange(brightnessSlider, setBrightness);
    }

    var displayTextSendElement = document.getElementById("display-text-send");

    onElementClick(displayTextSendElement, onDisplayTextSend);
}

function buttonSignal(message_code) {
    return function onClick() {
        BcuMessenger.send().buttonSignal(message_code);
    }
}

export function displayAdvancedData(current_status) {
    setup();
    var dockButton = document.getElementById("button-dock");
    var undockButton = document.getElementById("button-undock");

    const dockedStatusKey = "docked";

    const isDocked = current_status[dockedStatusKey];

    dockButton.disabled = isDocked;
    undockButton.disabled = !isDocked;

    populateDiagnoseTable(current_status["diagnose"]);


}

function populateDiagnoseTable(data) {
    function appendSpan(text, suffix = "") {
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
    document.getElementById("brightness-value").textContent = brightness;
    BcuMessenger.send().setBrightness(brightness);
}

function onDisplayTextSend() {
    let line1 = document.getElementById("display-line-1").value;
    let line2 = document.getElementById("display-line-2").value;
    BcuMessenger.send().sendDisplayText(line1, line2)
}
