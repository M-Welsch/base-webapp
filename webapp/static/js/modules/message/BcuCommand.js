import * as Messenger from "./json/JsonMessenger.js";

export function BcuCommand() {

}

BcuCommand.prototype.backupNow = function (onBackup) {
    Messenger.backupNow(onBackup);
}

BcuCommand.prototype.backupAbort = function (onAbort) {
    Messenger.backupAbort(onAbort);
}

BcuCommand.prototype.heartbeat = function (onAnswer, onError) {
    Messenger.heartbeat(onAnswer, onError);
}

BcuCommand.prototype.logfileIndex = function (onAnswer) {
    Messenger.logfileIndex(onAnswer);
}

BcuCommand.prototype.logfileIndex = function (onAnswer) {
    Messenger.logfileIndex(onAnswer);
}

BcuCommand.prototype.requestLogfile = function (selectedLogFile, onAnswer) {
    Messenger.requestLogfile(selectedLogFile, onAnswer);
}

BcuCommand.prototype.backupIndex = function (onAnswer) {
    Messenger.backupIndex(onAnswer);
}

BcuCommand.prototype.buttonSignal = function (messageCode) {
    Messenger.buttonSignal(messageCode);
}

BcuCommand.prototype.setBrightness = function (brightness) {
    Messenger.setBrightness(brightness);
}

BcuCommand.prototype.sendDisplayText = function (firstLine, secondLine) {
    Messenger.sendDisplayText(firstLine, secondLine);
}

BcuCommand.prototype.requestConfig = function (onAnswer) {
    Messenger.requestConfig(onAnswer);
}

BcuCommand.prototype.newConfig = function (settings) {
    Messenger.newConfig(settings);
}