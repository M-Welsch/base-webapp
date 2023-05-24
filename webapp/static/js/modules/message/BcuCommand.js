import { backupAbort, backupNow, heartbeat } from "./json/JsonMessenger.js";

export function BcuCommand() {

}

BcuCommand.prototype.backupNow = function(onBackup) {
    console.log("backup");
    backupNow(onBackup);
}

BcuCommand.prototype.backupAbort = function(onAbort) {
    console.log("backup abort");
    backupAbort(onAbort);
}

BcuCommand.prototype.heartbeat = function(onAnswer, onError) {
    heartbeat(onAnswer, onError);
}

export {backupAbort, backupNow, heartbeat}