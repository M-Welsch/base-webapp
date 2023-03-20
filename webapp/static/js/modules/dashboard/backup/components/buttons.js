import { backupNow, backupAbort } from "../actions/backup.js";

export function registerButtons() {

    (function() {
        const backupNowButton = document.getElementById("backup-now");
        if (backupNowButton)
            backupNowButton.addEventListener("click", backupNow);
    })();

    (function() {
        const backupAbortButton = document.getElementById("backup-abort");
        if (backupAbortButton)
            backupAbortButton.addEventListener("click", backupNow);
    })();

}