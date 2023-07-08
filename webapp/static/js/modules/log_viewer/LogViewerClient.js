import { BcuMessenger } from "../message/BcuMessenger";

/**
 * LogViewerClient
 * @constructor
 */
function LogViewerClient() {

}

/**
 * Request the selected logfile and apply the receive callback.
 *
 * @param {string} selectedLogFile The selected log file
 * @param {function(Array.<string>):void} applyOnLogFile The callback that should be applied on the received logfile
 */
LogViewerClient.prototype.requestLogFile = function (selectedLogFile, applyOnLogFile) {
    
    BcuMessenger.send().requestLogfile(selectedLogFile, function onLogfileReceive(answer) {

        let logfileLines = JSON.parse(answer)
        applyOnLogFile(logfileLines);

    });

}

export default LogViewerClient;