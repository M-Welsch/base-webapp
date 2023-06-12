import { BcuMessenger } from "./modules/message/BcuMessenger.js";

(function onPageLoad() {
    BcuMessenger.send().backupIndex(function onBackupIndexReceive(answer) {
        let backupIndex = JSON.parse(answer)
        updateBackupIndex(backupIndex);
    });
})();

function updateBackupIndex(backupIndex) {

    let table = document.getElementById("backup-index-list");
    table.innerHTML = "";

    for (let i = 0; i < backupIndex.length; i++) {

        let listElement = document.createElement("li");
        listElement.textContent = backupIndex[i];
        table.appendChild(listElement);

    }

}