var BASE_ADDRESS = "ws://127.0.0.1:8453"

/**
 * BcuCommunicator constructor.
 * Create and manage connections to Base-BCU
 */
function BcuCommunicator() {

    BcuCommunicator.connect.call(this);

}

BcuCommunicator.connect = function () {

    this.socket = new WebSocket(BASE_ADDRESS);
    this.socket.onopen = function (e) {
        console.log("Connection opened")
    };

    this.socket.onerror = function (error) {
        console.log("Connection onerror");
        defaultErrorCallback(error)
    };

    this.socket.onmessage = function (event) {
        console.log(`Received message from server: ${event.data}`);
    };

    this.socket.onclose = function () {
        console.log("Connection onclose");
    };

}

BcuCommunicator.prototype.defaultErrorCallback = function (error) {

    console.log(error); alert('Connection error');

}

/**
 * Send the given payload to Bcu.
 *
 * @param {string} payload Payload as JSON string 
 */
BcuCommunicator.prototype.send = function (payload) {

    console.log(`Sending with readyState ${this.socket.readyState}`)
    let readyStateDescription = getReadyState(this.socket.readyState);

    switch (this.socket.readyState) {
        case 0:
            console.log(readyStateDescription);
            break;
        case 1:
            console.log(`${readyStateDescription}, send payload ${payload}`);
            this.socket.send(payload);
            break;
        case 2:
            console.log(readyStateDescription);
            break;
        case 3:
            console.log("${readyStateDescription}, trying to reconnect");
            BcuCommunicator.connect.call(this);
            break;
    }

    /**
     * Get a readable description of the given ready state.
     *
     * @param {Number} stateValue The ready state value
     * @returns A description specifying the ready state.
     */
    function getReadyState(stateValue) {
        switch (stateValue) {
            case 0:
                return "Connecting";
            case 1:
                return "Open";
            case 2:
                return "Closing";
            case 3:
                return "Closed";
            default:
                return "Unknown ready state";
        }
    }

}

export default BcuCommunicator;