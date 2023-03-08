import { sendMessageToBcu } from "../../../controller/JsonController.js";

export function backupNow() {
    let message = {"code": "backup_now"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            if (answer == "backup_request_acknowledged") {
                document.getElementById("backup-now-wrapper").style.display = "none";
                document.getElementById("abort-backup-wrapper").style.display = "grid";
            }
        }
    );
}

export function backupAbort() {
    let message = {"code": "backup_abort"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            if (answer == "backup_abort_acknowledged") {
                document.getElementById("abort-backup-wrapper").style.display = "none";
                document.getElementById("backup-now-wrapper").style.display = "grid";
            }
        }
    );
}