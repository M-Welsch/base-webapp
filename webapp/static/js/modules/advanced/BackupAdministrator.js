import { BcuMessenger } from "../message/BcuMessenger.js";

/**
 * BackupAdministrator
 * @constructor
 */
function BackupAdministrator() {

}

/**
 * Set the display text.
 *
 * @param {string} line1 The first display line
 * @param {string} line2 The second display line
 */
BackupAdministrator.prototype.setDisplayText = function (line1, line2) {
    
    BcuMessenger.send().sendDisplayText(line1, line2)

}

/**
 * Set the display text.
 *
 * @param {string|Number} brightness The brightness value
 */
BackupAdministrator.prototype.setBrightness = function (brightness) {

    brightness = typeof brightness === "string" ? Number(brightness) : brightness;
    BcuMessenger.send().setBrightness(brightness);

}


/**
 * Submit a control signal.
 *
 * @param {string} controlSignal The signal code to submit
 */
BackupAdministrator.prototype.submitSignal = function (controlSignal) {

    BcuMessenger.send().buttonSignal(controlSignal);

}

export default BackupAdministrator;