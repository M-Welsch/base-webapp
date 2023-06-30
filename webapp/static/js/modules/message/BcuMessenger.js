import { BcuCommand } from "./BcuCommand.js";
import { BcuQuery } from "./BcuQuery.js";

export function BcuMessenger() {

}

BcuMessenger.send = function () {
    return new BcuCommand();
}

BcuMessenger.query = function () {
    return new BcuQuery();
}