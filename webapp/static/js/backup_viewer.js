function onPageLoad() {
    let socket = new WebSocket(BASE_ADDRESS);
    socket.onopen = function(e) {
        socket.send("backup_index");
    };

    socket.onerror = function(error) {
        alert('[close] Connection died');
    };

    socket.onmessage = function(event) {
        let backup_index = JSON.parse(event.data)
        update_backup_index(backup_index);
    };
}

function update_backup_index(backup_index) {
    let table = document.getElementById("backup-index-list");
    table.innerHTML = "";
    for (let i = 0; i < backup_index.length; i++) {
        table.innerHTML += "<li>"+backup_index[i]+"</li>"
    }
}