import { backupNow, backupAbort } from "../actions/backup.js";

export function registerButtons() {

    const backupWrapper = document.getElementById("backup-now-wrapper");

    const abortBackupWrapper = getAbortBackupWrapper();

    const backupNowButton = document.getElementById("backup-now");

    const backupAbortButton = document.getElementById("backup-abort");

    setupBackupButton(backupNowButton, backupWrapper, abortBackupWrapper);

    setupBackupAbortButton(backupAbortButton, abortBackupWrapper, backupWrapper);

    const bannerDismiss = document.getElementById("banner-dismiss");

    if (bannerDismiss)
        bannerDismiss.addEventListener("click", dismissWarningBanner)

    function getAbortBackupWrapper() {
        const abortBackupWrapper = document.getElementById("abort-backup-wrapper");
        if (abortBackupWrapper)
            abortBackupWrapper.style.display = "none";
        return abortBackupWrapper;
    }

}

function setupBackupAbortButton(backupAbortButton, abortBackupWrapper, backupWrapper) {
    if (backupAbortButton) {

        backupAbortButton.addEventListener("click", function onBackupAbortClick() {
            backupAbort(function onAbort() {
                abortBackupWrapper.style.display = "none";
                backupWrapper.style.display = "grid";
            });
        });

    }
}

function setupBackupButton(backupNowButton, backupWrapper, abortBackupWrapper) {
    if (backupNowButton) {

        backupNowButton.addEventListener("click", function onBackupNowClick() {
            backupNow(function onBackup() {
                backupWrapper.style.display = "none";
                abortBackupWrapper.style.display = "grid";
            });
        });

    }
}

function dismissWarningBanner() {
    let banners = document.getElementById("warning-banner");
    banners.style.opacity = "0";
    banners.style.height = "0px";
    banners.style.padding = "0px";
}