import { backupAbort, backupNow, heartbeat } from "./json/JsonMessenger.js";

export function BcuCommand() {

}

BcuCommand.prototype.backupNow = function(onBackup) {
    backupNow(onBackup);
}

BcuCommand.prototype.backupAbort = function(onAbort) {
    backupAbort(onAbort);
}

BcuCommand.prototype.heartbeat = function(onAnswer, onError) {
    heartbeat(onAnswer, onError);
}

export {backupAbort, backupNow, heartbeat}