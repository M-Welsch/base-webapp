import { sendMessageToBcu } from "./modules/message/json/JsonMessenger.js";

(function onPageLoad() {
    let message = {"code": "request_config"}
    sendMessageToBcu( JSON.stringify(message), onSettingsReceive );

    const intervalElement = document.getElementById("interval");
    if (intervalElement)
        intervalElement.addEventListener("change", onIntervalChange);

    const sshElement = document.getElementById("ssh");
    if (sshElement)
        sshElement.addEventListener("change", onProtocolChange);

    const smbElement = document.getElementById("smb");
    if (smbElement)
        smbElement.addEventListener("change", onProtocolChange);

    const saveConfigElement = document.getElementById("save-config");
    if (saveConfigElement)
        saveConfigElement.addEventListener("click", onSave);
})()


function onSettingsReceive(settings) {
    distributeConfigData(settings);
    onIntervalChange();
    onProtocolChange();
}


function distributeConfigData(answer) {
    let config_data = JSON.parse(answer);
    console.log(config_data);
    let time = config_data["schedule_backup"]["hour"]+":"+config_data["schedule_backup"]["minute"];
    document.getElementById("time-of-day").value = time;

    document.getElementById("interval").value = config_data["schedule_backup"]["backup_interval"];
    document.getElementById("day-of-month").value = config_data["schedule_backup"]["day_of_month"];
    document.getElementById("day-of-week").value = config_data["schedule_backup"]["day_of_week"];

    document.getElementById("shutdown-between-backups").checked = config_data["backup"]["shutdown_between_backups"];
    document.getElementById("use-pre-backup-hook").checked = config_data["backup"]["use_pre_backup_hook"];
    document.getElementById("pre-backup-hook-path").value = config_data["backup"]["pre_backup_hook_path"];
    document.getElementById("use-post-backup-hook").checked = config_data["backup"]["use_post_backup_hook"];
    document.getElementById("post-backup-hook-path").value = config_data["backup"]["post_backup_hook_path"];

    document.getElementById("ssh-host").value = config_data["nas"]["ssh_host"];
    document.getElementById("ssh-user").value = config_data["nas"]["ssh_user"];
    document.getElementById("smb-host").value = config_data["nas"]["smb_host"];
    document.getElementById("smb-user").value = config_data["nas"]["smb_user"];

    document.getElementById("shutdown-delay-minutes").value = config_data["schedule_config"]["shutdown_delay_minutes"];

    document.getElementById(config_data["sync"]["protocol"]).checked = true;
}


function onSave() {
    let [hour, minute] = document.getElementById("time-of-day").value.split(":");
    let settings = {
        "schedule_backup": {
            "backup_interval": document.getElementById("interval").value,
            "day_of_month": Number(document.getElementById("day-of-month").value),
            "day_of_week": Number(document.getElementById("day-of-week").value),
            "hour": Number(hour),
            "minute": Number(minute)
        },
        "backup": {
            "shutdown_between_backups": document.getElementById("shutdown-between-backups").checked,
            "use_pre_backup_hook": document.getElementById("use-pre-backup-hook").checked,
            "pre_backup_hook_path": document.getElementById("pre-backup-hook-path").value,
            "use_post_backup_hook": document.getElementById("use-post-backup-hook").checked,
            "post_backup_hook_path": document.getElementById("post-backup-hook-path").value
        },
        "nas": {
            "ssh_host": document.getElementById("ssh-host").value,
            "ssh_user": document.getElementById("ssh-user").value,
            "smb_host": document.getElementById("smb-host").value,
            "smb_user": document.getElementById("smb-user").value
        },
        "schedule_config": {
            "shutdown_delay_minutes": Number(document.getElementById("shutdown-delay-minutes").value)
        },
        "sync": {
            "protocol": document.querySelector('input[name="protocol"]:checked').value
        }
    }
    console.log( settings );
    let message = {"code": "new_config", "payload": JSON.stringify(settings)};
    sendMessageToBcu(JSON.stringify(message));
}


function onIntervalChange() {
    switch ( document.getElementById("interval").value ) {
        case "months":
            document.getElementById("day-of-month-item").style.display = "";
            document.getElementById("day-of-week-item").style.display = "none";
            break;
        case "weeks":
            document.getElementById("day-of-month-item").style.display = "none";
            document.getElementById("day-of-week-item").style.display = "";
            break;
        case "days":
            document.getElementById("day-of-month-item").style.display = "none";
            document.getElementById("day-of-week-item").style.display = "none";
            break;
    }
}


function onProtocolChange() {
    switch ( document.querySelector('input[name="protocol"]:checked').value ) {
        case "ssh":
            document.getElementById("ssh-source-parameters").style.display = "";
            document.getElementById("smb-source-parameters").style.display = "none";
            break;
        case "smb":
            document.getElementById("ssh-source-parameters").style.display = "none";
            document.getElementById("smb-source-parameters").style.display = "";
            break;
    }
}
