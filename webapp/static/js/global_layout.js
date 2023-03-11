import { onPageLoad } from "./dashboard.js";
import { BcuMessenger } from "./modules/message/BcuMessenger.js";


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


setInterval(BcuMessenger.send().heartbeat, 1000);

function ready(callbackFunction) {
    if(document.readyState != 'loading') callbackFunction(event);
    else document.addEventListener("DOMContentLoaded", callbackFunction);
}
ready(event => {
    onDocumentLoad();
})