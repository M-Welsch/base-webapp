function onPageLoad() {
    document.getElementById("abort-backup-wrapper").style.display = "none";
}

function dismissWarningBanner() {
    let banners = document.getElementById("warning-banner");
    banners.style.opacity = "0";
    banners.style.height = "0px";
    banners.style.padding = "0px";
//    setTimeout(function(){banners[0].remove();}, 500);
//    setTimeout(function(){banners[0].style.display = "none";}, 500);
}

function displayDashboardData( current_status ) {
    setDiscUsage(current_status["diagnose"]["Backup-HDD verfügbar"], current_status["backup_hdd_usage"]);
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
        document.getElementById("dock-icon").style.opacity = "30%";
    }
    if (current_status["powered"]) {
        document.getElementById("power-icon").style.opacity = "100%";
    } else {
        document.getElementById("power-icon").style.opacity = "30%";
    }
    if (current_status["mounted"]) {
        document.getElementById("mount-icon").style.opacity = "100%";
    } else {
        document.getElementById("mount-icon").style.opacity = "30%";
    }
    if (current_status["backup_running"]) {
        document.getElementById("backup-icon").style.opacity = "100%";
    } else {
        document.getElementById("backup-icon").style.opacity = "30%";
    }
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

function backupNow() {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("backup_now");
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        if (event.data == "backup_request_acknowledged") {
            document.getElementById("backup-now-wrapper").style.display = "none";
            document.getElementById("abort-backup-wrapper").style.display = "grid";
        }
    };
}

function backupAbort() {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("backup_abort");
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        if (event.data == "backup_abort_acknowledged") {
            document.getElementById("abort-backup-wrapper").style.display = "none";
            document.getElementById("backup-now-wrapper").style.display = "grid";
        }
    };
}
