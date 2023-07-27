import { BcuMessenger } from "../message/BcuMessenger.js";

/**
 * Heartbeat
 * @constructor
 */
function Heartbeat() {

}

/**
 * Initiate heartbeat.
 *
 * @param {function():void} onHeartbeatAnswer Answer callback
 * @param {function():void} onHeartbeatError Error callback
 */
Heartbeat.prototype.beep = function (onHeartbeatAnswer, onHeartbeatError) {
    
    setInterval(function repeatHeartbeat() { BcuMessenger.send().heartbeat(onHeartbeatAnswer, onHeartbeatError) }, 1000);

}

export default Heartbeat;

