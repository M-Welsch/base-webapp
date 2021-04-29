function requestConfigData() {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("request_config");
    };

    socket.onerror = function(error) {
        console.log(error);
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        let config_data = JSON.parse(event.data)
        console.log(config_data);
    };
}

function onSave() {
    let time = document.getElementById("time-of-day").value;
    let hour = 0;
    let minute = 0;
    let settings = {
        "schedule_backup": {
            "backup_interval": document.getElementById("interval").value,
            "day_of_month": document.getElementById("day-of-month").value,
            "day_of_week": document.getElementById("day-of-week").value,
            "hour": hour,
            "minute": minute
        },
        "backup": {
            "shutdown_between_backups": document.getElementById("shutdown-between-backups").value,
            "use_pre_backup_hook": document.getElementById("use-pre-backup-hook").value,
            "pre_backup_hook_path": document.getElementById("pre-backup-hook-path").value,
            "use_post_backup_hook": document.getElementById("use-post-backup-hook").value,
            "post_backup_hook_path": document.getElementById("post-backup-hook-path").value
        },
        "nas": {
            "ssh_host": document.getElementById("ssh-host").value,
            "ssh_user": document.getElementById("ssh-user").value,
            "smb_host": document.getElementById("smb-host").value,
            "smb_user": document.getElementById("smb-user").value
        },
        "schedule_config": {
            "shutdown_delay_minutes": document.getElementById("shutdown-delay-minutes").value
        },
        "sync": {
            "protocol": document.querySelector('input[name="protocol"]:checked').value
        }
    }
    console.log(settings);
}