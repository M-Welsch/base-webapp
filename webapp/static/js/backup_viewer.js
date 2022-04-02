function onPageLoad() {
    let message = {"code": "backup_index"};
    sendMessageToBcu(
        JSON.stringify(message),
        function(answer) {
            let backupIndex = JSON.parse(answer)
            updateBackupIndex(backupIndex);
        }
    );
}

function updateBackupIndex(backupIndex) {
    let table = document.getElementById("backup-index-list");
    table.innerHTML = "";
    for (let i = 0; i < backupIndex.length; i++) {
        table.innerHTML += "<li>"+backupIndex[i]+"</li>";
    }
}