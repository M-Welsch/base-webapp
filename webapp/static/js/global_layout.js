
function onDocumentLoad() {
    let page = window.location.pathname.slice(1);
    let items = document.getElementsByClassName("nav-link");

    for(let i = 0; i < items.length; i++){
        items[i].classList.remove("active-nav-link");
    }

    if (!page) {page = "dashboard"}
    document.getElementById("link-"+page).classList.add("active-nav-link");
}


setInterval(heartbeat, 10000);

function heartbeat() {
    let socket = new WebSocket("ws://192.168.178.39:8453");

    socket.onopen = function(e) {
        document.getElementById("not-connected").style.display = "none";
        document.getElementById("shutdown-timer").style.display = "block";
    };

    socket.onerror = function(error) {
        document.getElementById("shutdown-timer").style.display = "none";
        document.getElementById("not-connected").style.display = "block";
    };
}

//SOCKET.onopen = function(e) {
//    document.getElementById("not-connected").style.display = "none";
//    document.getElementById("shutdown-timer").style.display = "block";
//    SOCKET.send("Webapp hello!");
//};
//
//SOCKET.onmessage = function(event) {
//    alert(`[message] Data received from server: ${event.data}`);
//};
//
//SOCKET.onclose = function(event) {
////    document.getElementById("shutdown-timer").style.display = "none";
////    document.getElementById("not-connected").style.display = "block";
//    if (event.wasClean) {
////        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
//    } else {
//        // e.g. server process killed or network down
//        // event.code is usually 1006 in this case
////        alert('[close] Connection died');
//    }
//};

