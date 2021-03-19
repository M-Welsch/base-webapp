function buttonSignal(message_code) {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send(message_code);
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };
}