import { backupAbort, backupNow, heartbeat } from "./json/JsonMessenger.js";

export function BcuCommand() {

}

BcuCommand.prototype.backupNow = function() {
    console.log("backup");
    backupNow();
}

BcuCommand.prototype.backupAbort = function() {
    console.log("backup abort");
    backupAbort();
}

BcuCommand.prototype.heartbeat = function() {
    heartbeat();
}

export {backupAbort, backupNow, heartbeat}