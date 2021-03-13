
function onDocumentLoad() {
    let page = window.location.pathname.slice(1);
    let items = document.getElementsByClassName("nav-link");

    for(let i = 0; i < items.length; i++){
        items[i].classList.remove("active-nav-link");
    }

    if (!page) {page = "dashboard"}
    document.getElementById("link-"+page).classList.add("active-nav-link");
}