const BASE_ADDRESS = "ws://192.168.0.61:8453"


function onDocumentLoad() {
    let page = window.location.pathname.slice(1);
    let items = document.getElementsByClassName("nav-link");

    for(let i = 0; i < items.length; i++){
        items[i].classList.remove("active-nav-link");
    }

    if (!page) {page = "dashboard"}
    document.getElementById("link-"+page).classList.add("active-nav-link");
}


setInterval(heartbeat, 1000);

function heartbeat() {
    let socket = new WebSocket(BASE_ADDRESS);

    socket.onopen = function(e) {
        document.getElementById("not-connected").style.display = "none";
        document.getElementById("shutdown-timer").style.display = "block";
        socket.send("heartbeat?");
    };

    socket.onerror = function(error) {
        document.getElementById("shutdown-timer").style.display = "none";
        document.getElementById("not-connected").style.display = "block";
    };

    socket.onmessage = function(event) {
        let current_status = JSON.parse(event.data)
        console.log(current_status);
        distribute_data(current_status);
    };
}

function distribute_data(current_status) {
    document.getElementById("button-dock").disabled = current_status["docked"];
    document.getElementById("button-undock").disabled = !current_status["docked"];
}