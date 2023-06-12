import * as Messenger from "./json/JsonMessenger.js";

export function BcuCommand() {

}

BcuCommand.prototype.backupNow = function(onBackup) {
    Messenger.backupNow(onBackup);
}

BcuCommand.prototype.backupAbort = function(onAbort) {
    Messenger.backupAbort(onAbort);
}

BcuCommand.prototype.heartbeat = function(onAnswer, onError) {
    Messenger.heartbeat(onAnswer, onError);
}

BcuCommand.prototype.logfileIndex = function(onAnswer) {
    Messenger.logfileIndex(onAnswer);
}

BcuCommand.prototype.logfileIndex = function(onAnswer) {
    Messenger.logfileIndex(onAnswer);
}

BcuCommand.prototype.requestLogfile = function(selectedLogFile, onAnswer) {
    Messenger.requestLogfile(selectedLogFile, onAnswer);
}

BcuCommand.prototype.backupIndex = function(onAnswer) {
    Messenger.backupIndex(onAnswer);
}