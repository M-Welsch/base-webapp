//const BASE_ADDRESS = "ws://192.168.178.39:8453"
var BASE_ADDRESS = "ws://127.0.0.1:8453"

export function sendMessageToBcu(
    payload,
    callback = function () { },
    error_callback = function (error) { console.log(error); alert('[close] Connection died'); }
) {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function (e) {
        socket.send(payload);
    };

    socket.onerror = function (error) {
        error_callback(error)
    };

    socket.onmessage = function (event) {
        callback(event.data);
    };
}

export function backupNow(onBackup) {
    let message = buildMessage("backup_now");
    sendMessage(message, onBackup, "backup_request_acknowledged");
}

export function backupAbort(onAbort) {
    let message = buildMessage("backup_abort");
    sendMessage(message, onAbort, "backup_abort_acknowledged");
}

export function heartbeat(onAnswer, onError) {
    let message = buildMessage("heartbeat");
    sendMessage(message, onAnswer, null, onError);
}

export function logfileIndex(onAnswer) {
    let message = buildMessage("logfile_index");
    sendMessage(message, onAnswer);
}

export function requestLogfile(selectedLogfile, onAnswer) {
    let message = buildMessage("request_logfile", selectedLogfile);
    sendMessage(message, onAnswer);
}

export function backupIndex(onAnswer) {
    let message = buildMessage("backup_index");
    sendMessage(message, onAnswer);
}

export function buttonSignal(messageCode) {
    let message = buildMessage(messageCode);
    sendMessage(message);
}

export function setBrightness(brightness) {

    let message = buildMessage("display_brightness", brightness);
    sendMessage(message);
}

export function sendDisplayText(firstLine, secondLine) {
    let message = buildMessage("display_text", { "line1": firstLine, "line2": secondLine });
    sendMessage(message);
}

export function requestConfig(onAnswer) {
    let message = buildMessage("request_config");
    sendMessage(message, onAnswer);
}

export function newConfig(settings) {
    let message = buildMessage("new_config", JSON.stringify(settings));
    sendMessage(message);
}

function sendMessage(message, onMessage, answerCode, onError) {

    var answerCodeHandler = function onAnswer(answer) {
        if (answerCode == answer) {
            onMessage();
        }
    }

    sendMessageToBcu(
        JSON.stringify(message),
        answerCode ? answerCodeHandler : onMessage,
        onError
    );
}

function buildMessage(code, payload) {

    let message = { "code": code };

    if (payload || payload === 0)
        message["payload"] = payload;

    return message;

}