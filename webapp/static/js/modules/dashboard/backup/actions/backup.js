import { BcuMessenger } from "/static/js/modules/message/BcuMessenger.js";

export function backupNow(onBackup) {
    console.log("init backup");
    BcuMessenger.send().backupNow(onBackup);
}

export function backupAbort(onAbort) {
    BcuMessenger.send().backupAbort(onAbort);
}