import { backupNow, backupAbort } from "../actions/backup.js";

const idOnClickMapping = {
    "backup-now": backupNow,
    "backup-abort": backupAbort
}

export function registerButtons() {

    (function() {
        for (const [id, onClick] of Object.entries(idOnClickMapping)) {
            register(id, onClick);
        }
    })();

}

function register(id, onClick) {
    const someButton = document.getElementById(id);
    if (someButton)
        someButton.addEventListener("click", onClick);
}