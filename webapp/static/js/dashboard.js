
function dismissWarningBanner() {
    let banners = document.getElementById("warning-banner");
    banners.style.opacity = "0";
    banners.style.height = "0px";
    banners.style.padding = "0px";
//    setTimeout(function(){banners[0].remove();}, 500);
//    setTimeout(function(){banners[0].style.display = "none";}, 500);
}

function displayDashboardData( current_status ) {
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
