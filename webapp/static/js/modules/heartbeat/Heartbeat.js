import { BcuMessenger } from "../message/BcuMessenger.js";

/**
 * Heartbeat
 * @constructor
 */
function Heartbeat() {

}

/**
 * Push the new settings to the server.
 *
 * @param {Object} newSettings The new settings JSON object
 */
Heartbeat.prototype.beep = function (onHeartbeatAnswer, onHeartbeatError) {
    
    setInterval(function repeatHeartbeat() { BcuMessenger.send().heartbeat(onHeartbeatAnswer, onHeartbeatError) }, 1000);

}

export default Heartbeat;

