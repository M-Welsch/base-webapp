import { backupNow, backupAbort } from "../actions/backup.js";

const backupNowButton = document.getElementById("backup-now");
backupNowButton.addEventListener("click", backupNow);

const backupAbortButton = document.getElementById("backup-abort");
backupAbort.addEventListener("click", backupAbort);