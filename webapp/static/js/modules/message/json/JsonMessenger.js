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
    let message = {"code": "backup_now"};
    sendMessage(message, "backup_request_acknowledged", onBackup);
}

export function backupAbort(onAbort) {
    let message = {"code": "backup_abort"};
    sendMessage(message, "backup_abort_acknowledged", onAbort);
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

export function heartbeat(onAnswer, onError) {
    let message = {"code": "heartbeat"};
    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer,
        onError
    );
}

export function logfileIndex(onAnswer) {
    let message = {"code": "logfile_index"};
    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer
    );
}

export function requestLogfile(selectedLogfile, onAnswer) {
    let message = {"code": "request_logfile", "payload": selectedLogfile};

    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer
    );
}

export function backupIndex(onAnswer) {
    let message = {"code": "backup_index"};
    sendMessageToBcu(
        JSON.stringify(message),
        onAnswer
    );
}