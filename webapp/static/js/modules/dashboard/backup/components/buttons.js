import { BcuMessenger } from "/static/js/modules/message/BcuMessenger.js";

export function registerButtons() {

    const backupWrapper = document.getElementById("backup-now-wrapper");

    const abortBackupWrapper = getAbortBackupWrapper();

    const backupNowButton = document.getElementById("backup-now");

    const backupAbortButton = document.getElementById("backup-abort");

    setupBackupButton(backupNowButton, backupWrapper, abortBackupWrapper);

    setupBackupAbortButton(backupAbortButton, backupWrapper, abortBackupWrapper);

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

function setupBackupAbortButton(backupAbortButton, backupWrapper, abortBackupWrapper) {

    setupButton(backupAbortButton, function onBackupAbortClick() {

        BcuMessenger.send().backupAbort(function onAbort() {

            setupBackupWrappers(backupWrapper, abortBackupWrapper, true);

        });

    });

}

function setupBackupButton(backupNowButton, backupWrapper, abortBackupWrapper) {

    setupButton(backupNowButton, function onBackupNowClick() {

        BcuMessenger.send().backupNow(function onBackup() {

            setupBackupWrappers(backupWrapper, abortBackupWrapper, false);

        });

    });

}

function setupButton(clickedButton, onButtonClick) {

    if (clickedButton) {

        clickedButton.addEventListener("click", onButtonClick);

    }

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