import { setStatus, status_types } from "./modules/dashboard/status.js";
import { registerButtons } from "./modules/dashboard/backup/components/buttons.js";

(function onPageLoad() {
    registerButtons();
})()

export function displayDashboardData( current_status ) {

    var availability = current_status["diagnose"]["Backup-HDD verfügbar"];
    var hddUsagePercentage = current_status["backup_hdd_usage"];
    setDiscUsage(availability, hddUsagePercentage);

    var logTail = current_status["log_tail"].join("\n");
    document.getElementById("log-view").textContent = logTail;

    var recentWarningsCount = current_status["recent_warnings_count"];
    var warningBanner = document.getElementById("warning-banner");
    warningBanner.style.display = recentWarningsCount > 0 ? "flex" : "none";

    var nextBackupDue = current_status["next_backup_due"];

    document.getElementById("banner-warning-count").textContent = recentWarningsCount;
    document.getElementById("next-backup-due-text").textContent = nextBackupDue;

    for (const [status, status_element] of Object.entries(status_types)) {
        setStatus(current_status, status, status_element);
    }
}

function setDiscUsage(availability, percentage) {

    document.getElementById("backup-hdd-usage-percentage").textContent = ~~percentage;
    document.getElementById("hdd-space-used").style.width = `${percentage} %`;
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
