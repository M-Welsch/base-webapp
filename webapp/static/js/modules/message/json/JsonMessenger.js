import { displayDashboardData } from "../../../dashboard.js";
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

export function backupNow() {
    let message = {"code": "backup_now"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            if (answer == "backup_request_acknowledged") {
                document.getElementById("backup-now-wrapper").style.display = "none";
                document.getElementById("abort-backup-wrapper").style.display = "grid";
            }
        }
    );
}

export function backupAbort() {
    let message = {"code": "backup_abort"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            if (answer == "backup_abort_acknowledged") {
                document.getElementById("abort-backup-wrapper").style.display = "none";
                document.getElementById("backup-now-wrapper").style.display = "grid";
            }
        }
    );
}

export function heartbeat() {
    let message = {"code": "heartbeat"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            document.getElementById("not-connected").style.display = "none";
            document.getElementById("shutdown-timer").style.display = "block";
            let current_status = JSON.parse(answer)
    //        console.log(current_status);
            distribute_data(current_status);
        },
        function(error) {
            document.getElementById("shutdown-timer").style.display = "none";
            document.getElementById("not-connected").style.display = "block";
        }
    );
}

function distribute_data( current_status ) {
    let page = window.location.pathname.slice( 1 );
    switch ( page ) {
        case "":
            displayDashboardData( current_status );
            break;
        case "advanced":
            displayAdvancedData( current_status );
            break;
    }
}