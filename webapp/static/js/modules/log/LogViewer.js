import { BcuMessenger } from "../message/BcuMessenger.js";

/**
 * LogViewerClient
 * @constructor
 */
function LogViewer() {

}

/**
 * Request the logfile index and apply the receive callback.
 *
 * @param {function(Array.<string>):void} applyOnLogFileIndex The callback that should be applied on the received logfile index
 */
LogViewer.prototype.requestLogFileIndex = function (applyOnLogFileIndex) {
    
    BcuMessenger.send().logfileIndex(function onLogfileIndexReceive(answer) {

        let logfileIndex = JSON.parse(answer)
        applyOnLogFileIndex(logfileIndex);

    });

}

/**
 * Request the selected logfile and apply the receive callback.
 *
 * @param {string} selectedLogFile The selected log file
 * @param {function(Array.<string>):void} applyOnLogFile The callback that should be applied on the received logfile
 */
LogViewer.prototype.requestLogFile = function (selectedLogFile, applyOnLogFile) {
    
    BcuMessenger.send().requestLogfile(selectedLogFile, function onLogfileReceive(answer) {

        let logfileLines = JSON.parse(answer)
        applyOnLogFile(logfileLines);

    });

}

export default LogViewer;