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