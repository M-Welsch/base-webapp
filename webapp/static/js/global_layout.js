const BASE_ADDRESS = "ws://192.168.178.39:8453"


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
//        console.log(current_status);
        distribute_data(current_status);
    };
}


function pass_data_to_dashboard( current_status) {
    document.getElementById("backup-hdd-usage-text").innerHTML = ~~(current_status["backup_hdd_usage"] *100);
    document.getElementById("hdd-space-used").style.width = (current_status["backup_hdd_usage"] * 100) + "%";
    document.getElementById("log-view").innerHTML = current_status["log_tail"].join("\n");
    if (~~current_status["recent_warnings_count"] > 0) {
        document.getElementById("warning-banner").style.display = "flex";
    } else {
        document.getElementById("warning-banner").style.display = "none";
    }
    document.getElementById("banner-warning-count").innerHTML = current_status["recent_warnings_count"];
    document.getElementById("next-backup-due-text").innerHTML = current_status["next_backup_due"];

    if (current_status["docked"]) {
        document.getElementById("dock-icon").style.opacity = "100%";
    } else {
        document.getElementById("dock-icon").style.opacity = "50%";
    }
    if (current_status["powered"]) {
        document.getElementById("power-icon").style.opacity = "100%";
    } else {
        document.getElementById("power-icon").style.opacity = "50%";
    }
    if (current_status["mounted"]) {
        document.getElementById("mount-icon").style.opacity = "100%";
    } else {
        document.getElementById("mount-icon").style.opacity = "50%";
    }
    if (current_status["backup_running"]) {
        document.getElementById("backup-icon").style.opacity = "100%";
    } else {
        document.getElementById("backup-icon").style.opacity = "50%";
    }
}

function pass_data_to_advanced( current_status ) {
    document.getElementById("button-dock").disabled = current_status["docked"];
    document.getElementById("button-undock").disabled = !current_status["docked"];
}

function distribute_data( current_status ) {
    let page = window.location.pathname.slice( 1 );
    switch ( page ) {
        case "":
            pass_data_to_dashboard( current_status );
            break;
        case "advanced":
            pass_data_to_advanced( current_status );
            break;
    }
}


function ready(callbackFunction){
    if(document.readyState != 'loading') callbackFunction(event);
    else document.addEventListener("DOMContentLoaded", callbackFunction);
}
ready(event => {
    onDocumentLoad();
})