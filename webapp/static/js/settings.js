import BackupConfigurator from "./modules/config/BackupConfigurator.js";
import { onElementChange, onElementClick } from "./modules/utils/ElementUtils.js";

(function onPageLoad() {
    let backupConfigurator = new BackupConfigurator();
    backupConfigurator.requestConfig(onSettingsReceive);

    const intervalElement = document.getElementById("interval");
    onElementChange(intervalElement, onIntervalChange);

    const sshElement = document.getElementById("ssh");
    onElementChange(sshElement, onProtocolChange);

    const smbElement = document.getElementById("smb");
    onElementChange(smbElement, onProtocolChange);

    const saveConfigElement = document.getElementById("save-config");
    onElementClick(saveConfigElement, onSave);
})()


function onSettingsReceive(settings) {
    distributeConfigData(settings);
    onIntervalChange();
    onProtocolChange();
}


function distributeConfigData(answer) {
    let config_data = JSON.parse(answer);
    console.log(config_data);
    let time = config_data["schedule_backup"]["hour"] + ":" + config_data["schedule_backup"]["minute"];
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

    let settings = getNewSettings();

    let backupConfigurator = new BackupConfigurator();
    backupConfigurator.newConfig(settings);
}

function getNewSettings() {
    
    let [hour, minute] = document.getElementById("time-of-day").value.split(":");
 
    return {
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
    };

}

function onIntervalChange() {

    const dayOfMonthSelect = document.getElementById("day-of-month-item");
    const dayOfWeekSelect = document.getElementById("day-of-week-item");

    const backupInterval = document.getElementById("interval").value;

    switch (backupInterval) {
        case "months":
            showDayOfMonthSelect();
            hideDayOfWeekSelect();
            break;
        case "weeks":
            hideDayOfMonthSelect();
            showDayOfWeekSelect();
            break;
        case "days":
            hideDayOfMonthSelect();
            hideDayOfWeekSelect();
            break;
    }

    function showDayOfMonthSelect() {
        setElementVisible(dayOfMonthSelect, true);
    }

    function hideDayOfMonthSelect() {
        setElementVisible(dayOfMonthSelect, false);
    }

    function showDayOfWeekSelect() {
        setElementVisible(dayOfWeekSelect, true);
    }

    function hideDayOfWeekSelect() {
        setElementVisible(dayOfWeekSelect, false);
    }

}


function onProtocolChange() {

    const sshSourceParametersElement = document.getElementById("ssh-source-parameters");
    const smbSourceParametersElement = document.getElementById("smb-source-parameters");

    const selectedProtocol = document.querySelector('input[name="protocol"]:checked').value;

    switch (selectedProtocol) {
        case "ssh":
            showSSHParameters();
            hideSMBParameters();
            break;
        case "smb":
            hideSSHParameters();
            showSMBParameters();
            break;
    }

    function showSSHParameters() {
        setElementVisible(sshSourceParametersElement, true);
    }

    function hideSSHParameters() {
        setElementVisible(sshSourceParametersElement, false);
    }

    function showSMBParameters() {
        setElementVisible(smbSourceParametersElement, true);
    }

    function hideSMBParameters() {
        setElementVisible(smbSourceParametersElement, false);
    }
}

function setElementVisible(element, isVisible) {
    element.style.display = isVisible ? "" : "none";
}

