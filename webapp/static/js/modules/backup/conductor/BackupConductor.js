import { BcuMessenger } from "../../message/BcuMessenger.js";

/**
 * BackupConductor
 * @constructor
 */
function BackupConductor() {

}

/**
 * Initialize backup.
 *
 * @param {function():void} onBackupInit The callback that should be applied on backup initialization
 */
BackupConductor.prototype.backup = function (onBackupInit) {
    
    BcuMessenger.send().backupNow(function onBackup() {

        onBackupInit();

    });
}

/**
 * Abort backup.
 *
 * @param {function():void} onBackupAbort The callback that should be applied on backup cancellation
 */
BackupConductor.prototype.abort = function (onBackupAbort) {
    
    BcuMessenger.send().backupAbort(function abort() {

        onBackupAbort();

    });
}

export default BackupConductor;