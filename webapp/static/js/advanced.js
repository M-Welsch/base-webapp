function requestShutdown() {
    let socket = new WebSocket("ws://192.168.178.39:8453");

    socket.onopen = function(e) {
        socket.send("shutdown_request");
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };
}