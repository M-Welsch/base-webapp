import { backupNow, backupAbort } from "../actions/backup.js";

export function registerButtons() {

    (function() {
        const backupNowButton = document.getElementById("backup-now");
        backupNowButton.addEventListener("click", backupNow);
    })();

    (function() {
        const backupAbortButton = document.getElementById("backup-abort");
        backupAbortButton.addEventListener("click", backupAbort);
    })();

}