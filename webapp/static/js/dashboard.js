import { setStatus, status_types } from "./modules/dashboard/status.js";
import { registerButtons } from "./modules/dashboard/backup/components/buttons.js";

(function onPageLoad() {
    registerButtons();
})()

export function displayDashboardData( current_status ) {
    setDiscUsage(current_status["diagnose"]["Backup-HDD verfügbar"], current_status["backup_hdd_usage"]);
    document.getElementById("log-view").textContent = current_status["log_tail"].join("\n");
    if (~~current_status["recent_warnings_count"] > 0) {
        document.getElementById("warning-banner").style.display = "flex";
    } else {
        document.getElementById("warning-banner").style.display = "none";
    }
    document.getElementById("banner-warning-count").textContent = current_status["recent_warnings_count"];
    document.getElementById("next-backup-due-text").textContent = current_status["next_backup_due"];

    for (const [status, status_element] of Object.entries(status_types)) {
        setStatus(current_status, status, status_element);
    }
}

function setDiscUsage(availability, percentage) {

    document.getElementById("backup-hdd-usage-percentage").textContent = ~~percentage;
    document.getElementById("hdd-space-used").style.width = percentage + "%";
    if ( availability == "available" ) {
        setElements("#333", "block", "none");
    } else {
        setElements("gray", "none", "block");
    }
    
    function setElements(bgColor, display1, display2) {
        document.getElementById("hdd-space-free").style.backgroundColor = bgColor;
        document.getElementById("backup-hdd-usage-text").style.display = display1;
        document.getElementById("backup-hdd-not-available-text").style.display = display2;
    }

}
