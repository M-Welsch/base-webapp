
function dismissWarningBanner() {
    let banners = document.getElementById("warning-banner");
    banners.style.opacity = "0";
    banners.style.height = "0px";
    banners.style.padding = "0px";
//    setTimeout(function(){banners[0].remove();}, 500);
//    setTimeout(function(){banners[0].style.display = "none";}, 500);
}