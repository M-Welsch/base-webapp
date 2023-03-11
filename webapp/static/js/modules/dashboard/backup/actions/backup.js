import { BcuMessenger } from "../../../message/BcuMessenger.js";

export function backupNow() {
    console.log("init backup");
    BcuMessenger.send().backupNow();
}

export function backupAbort() {
    BcuMessenger.send().backupAbort();
}