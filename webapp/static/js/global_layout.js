import { onPageLoad } from "./dashboard.js";
import { BcuMessenger } from "./modules/message/BcuMessenger.js";
import { displayDashboardData } from "./dashboard.js";

function onDocumentLoad() {
    let page = window.location.pathname.slice(1);
    let items = document.getElementsByClassName("nav-link");

    for (let i = 0; i < items.length; i++){
        items[i].classList.remove("active-nav-link");
    }

    if ( !page ) { page = "dashboard" }
    document.getElementById("link-"+page).classList.add("active-nav-link");

    onPageLoad();
}

function onHeartbeatAnswer (answer) {
    document.getElementById("not-connected").style.display = "none";
    document.getElementById("shutdown-timer").style.display = "block";
    let current_status = JSON.parse(answer)
    distribute_data(current_status);
}

function onHeartbeatError (error) {
    document.getElementById("shutdown-timer").style.display = "none";
    document.getElementById("not-connected").style.display = "block";
}

setInterval(function repeatHeartbeat() { BcuMessenger.send().heartbeat(onHeartbeatAnswer, onHeartbeatError) }, 1000);

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