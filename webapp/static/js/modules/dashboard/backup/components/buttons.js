import { onElementClick } from "/static/js/modules/utils/ElementUtils.js";
import BackupConductor from "/static/js/modules/backup/conductor/BackupConductor.js"


export function registerButtons() {

    const backupWrapper = document.getElementById("backup-now-wrapper");

    const abortBackupWrapper = getAbortBackupWrapper();

    const backupNowButton = document.getElementById("backup-now");

    const backupAbortButton = document.getElementById("backup-abort");

    setupBackupButton(backupNowButton, backupWrapper, abortBackupWrapper);

    setupBackupAbortButton(backupAbortButton, backupWrapper, abortBackupWrapper);

    const bannerDismiss = document.getElementById("banner-dismiss");

    onElementClick(bannerDismiss, dismissWarningBanner);

    function getAbortBackupWrapper() {
        const abortBackupWrapper = document.getElementById("abort-backup-wrapper");
        if (abortBackupWrapper)
            abortBackupWrapper.style.display = "none";
        return abortBackupWrapper;
    }

}

function setupBackupAbortButton(backupAbortButton, backupWrapper, abortBackupWrapper) {

    onElementClick(backupAbortButton, function onBackupAbortClick() {

        let backupConductor = new BackupConductor();

        backupConductor.abort(function onBackup() {

            setupBackupWrappers(backupWrapper, abortBackupWrapper, false);

        })

    });

}

function setupBackupButton(backupNowButton, backupWrapper, abortBackupWrapper) {

    onElementClick(backupNowButton, function onBackupNowClick() {

        let backupConductor = new BackupConductor();

        backupConductor.backup(function onBackup() {

            setupBackupWrappers(backupWrapper, abortBackupWrapper, false);

        })

    });

}

function setupBackupWrappers(backupWrapper, abortBackupWrapper, backupTriggered) {

    abortBackupWrapper.style.display = backupTriggered ? "grid" : "none";
    backupWrapper.style.display = backupTriggered ? "none" : "grid";

}

function dismissWarningBanner() {
    let banners = document.getElementById("warning-banner");
    banners.style.opacity = "0";
    banners.style.height = "0px";
    banners.style.padding = "0px";
}