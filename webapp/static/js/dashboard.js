
function dismissWarningBanner() {
    let banners = document.getElementsByClassName("warning-banner");
    banners[0].style.opacity = "0";
    banners[0].style.height = "0px";
    banners[0].style.padding = "0px";
//    setTimeout(function(){banners[0].remove();}, 500);
//    setTimeout(function(){banners[0].style.display = "none";}, 500);
}