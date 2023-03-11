import { setStatus } from "./modules/dashboard/status.js";
import { registerButtons } from "./modules/dashboard/backup/components/buttons.js";

export function onPageLoad() {
    document.getElementById("abort-backup-wrapper").style.display = "none";
    registerButtons();
}


function dismissWarningBanner() {
    let banners = document.getElementById("warning-banner");
    banners.style.opacity = "0";
    banners.style.height = "0px";
    banners.style.padding = "0px";
//    setTimeout(function(){banners[0].remove();}, 500);
//    setTimeout(function(){banners[0].style.display = "none";}, 500);
}

export function displayDashboardData( current_status ) {
    setDiscUsage(current_status["diagnose"]["Backup-HDD verfügbar"], current_status["backup_hdd_usage"]);
    document.getElementById("log-view").innerHTML = current_status["log_tail"].join("\n");
    if (~~current_status["recent_warnings_count"] > 0) {
        document.getElementById("warning-banner").style.display = "flex";
    } else {
        document.getElementById("warning-banner").style.display = "none";
    }
    document.getElementById("banner-warning-count").innerHTML = current_status["recent_warnings_count"];
    document.getElementById("next-backup-due-text").innerHTML = current_status["next_backup_due"];

    setStatus(current_status);
}

function setDiscUsage(availability, percentage) {
    function setElements(bgColor, display1, display2) {
        document.getElementById("hdd-space-free").style.backgroundColor = bgColor;
        document.getElementById("backup-hdd-usage-text").style.display = display1;
        document.getElementById("backup-hdd-not-available-text").style.display = display2;
    }

    document.getElementById("backup-hdd-usage-percentage").innerHTML = ~~percentage;
    document.getElementById("hdd-space-used").style.width = percentage + "%";
    if ( availability == "available" ) {
        setElements("#333", "block", "none");
    } else {
        setElements("gray", "none", "block");
    }
}
