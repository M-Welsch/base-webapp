import { BcuMessenger } from "../message/BcuMessenger.js";

/**
 * BackupViewer
 * @constructor
 */
function BackupViewer() {

}

/**
 * Request the current config and apply the receive callback.
 *
 * @param {function(string):void} applyOnBackupIndex The callback that should be applied on the received backup index
 */
BackupViewer.prototype.backupIndex = function (applyOnBackupIndex) {
    
    BcuMessenger.send().backupIndex(function onBackupIndexReceive(answer) {

        let backupIndex = JSON.parse(answer)
        applyOnBackupIndex(backupIndex);

    });

}

export default BackupViewer;