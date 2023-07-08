import { BcuMessenger } from "../message/BcuMessenger.js";

/**
 * SettingsClient
 * @constructor
 */
function SettingsClient() {

}

/**
 * Request the current config and apply the receive callback.
 *
 * @param {function(string):void} applyOnConfig The callback that should be applied on the received configuration string
 */
SettingsClient.prototype.requestConfig = function (applyOnConfig) {
    
    BcuMessenger.send().requestConfig(function onConfigReceive(answer) {

        applyOnConfig(answer);

    });

}

/**
 * Push the new settings to the server.
 *
 * @param {Object} newSettings The new settings JSON object
 */
SettingsClient.prototype.newConfig = function (newSettings) {
    
    BcuMessenger.send().newConfig(newSettings);

}

export default SettingsClient;