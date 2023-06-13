//const BASE_ADDRESS = "ws://192.168.178.39:8453"
var BASE_ADDRESS = "ws://127.0.0.1:8453"

export function sendMessageToBcu(
        payload,
        callback = function(){},
        error_callback = function(error){ console.log(error); alert('[close] Connection died'); }
    ) {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send(payload);
    };

    socket.onerror = function(error) {
        error_callback(error)
    };

    socket.onmessage = function(event) {
        callback(event.data);
    };
}

export function backupNow(onBackup) {
    let message = buildMessage("backup_now");
    sendMessage(message, "backup_request_acknowledged", onBackup);
}

export function backupAbort(onAbort) {
    let message = buildMessage("backup_abort");
    sendMessage(message, "backup_abort_acknowledged", onAbort);
}

export function heartbeat(onAnswer, onError) {
    let message = buildMessage("heartbeat");
    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer,
        onError
    );
}

export function logfileIndex(onAnswer) {
    let message = buildMessage("logfile_index");
    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer
    );
}

export function requestLogfile(selectedLogfile, onAnswer) {
    let message = buildMessage("request_logfile", selectedLogfile);

    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer
    );
}

export function backupIndex(onAnswer) {
    let message = buildMessage("backup_index");
    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer
    );
}

export function buttonSignal(messageCode) {
    let message = buildMessage(messageCode);
    sendMessageToBcu(
        JSON.stringify(message)
    );
}

export function setBrightness(brightness) {
    let message = buildMessage("display_brightness", brightness);
    sendMessageToBcu(JSON.stringify(message));
}

export function sendDisplayText(firstLine, secondLine) {
    let message = buildMessage("display_text", {"line1": firstLine, "line2": secondLine});
    sendMessageToBcu(JSON.stringify(message));
}

export function requestConfig(onAnswer) {
    let message = buildMessage("request_config");
    sendMessageToBcu(JSON.stringify(message), onAnswer);
}

export function newConfig(settings) {
    let message = buildMessage("new_config", JSON.stringify(settings));
    sendMessageToBcu(JSON.stringify(message));
}

function sendMessage(message, answerCode, onMessage) {
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            if (answerCode == answer) {
                onMessage();
            }
        }
    );
}

function buildMessage(code, payload) {

    let message = {"code": code};

    if (payload)
        message["payload"] = payload;

        return message;

}