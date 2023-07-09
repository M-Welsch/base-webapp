import BackupViewer from "./modules/backup/viewer/BackupViewer.js";

(function onPageLoad() {

    let backupViewer = new BackupViewer();
    backupViewer.backupIndex(function onBackupIndexReceive(answer) {
        let backupIndex = JSON.parse(answer)
        updateBackupIndex(backupIndex);
    })

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