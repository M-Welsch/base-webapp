function onPageLoad() {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("backup_index");
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        let backupIndex = JSON.parse(event.data)
        updateBackupIndex(backupIndex);
    };
}

function updateBackupIndex(backupIndex) {
    let table = document.getElementById("backup-index-list");
    table.innerHTML = "";
    for (let i = 0; i < backupIndex.length; i++) {
        table.innerHTML += "<li>"+backupIndex[i]+"</li>";
    }
}