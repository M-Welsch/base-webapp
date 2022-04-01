//const BASE_ADDRESS = "ws://192.168.178.39:8453"
const BASE_ADDRESS = "ws://127.0.0.1:8453"


function sendMessageToBcu(
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


function onDocumentLoad() {
    let page = window.location.pathname.slice(1);
    let items = document.getElementsByClassName("nav-link");

    for(let i = 0; i < items.length; i++){
        items[i].classList.remove("active-nav-link");
    }

    if ( !page ) { page = "dashboard" }
    document.getElementById("link-"+page).classList.add("active-nav-link");

    onPageLoad();
}


setInterval(heartbeat, 1000);

function heartbeat() {
    sendMessageToBcu(
        '{"code":"heartbeat","payload":""}',
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


function ready(callbackFunction) {
    if(document.readyState != 'loading') callbackFunction(event);
    else document.addEventListener("DOMContentLoaded", callbackFunction);
}
ready(event => {
    onDocumentLoad();
})