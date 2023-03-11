import { BcuCommand } from "./BcuCommand.js";
import { BcuQuery } from "./BcuQuery.js";

export function BcuMessenger() {

}

BcuMessenger.send = function () {
    console.log("Submit bcu command");
    return new BcuCommand();
}

BcuMessenger.query = function() {
    console.log("Submit bcu query");
    return new BcuQuery();
}