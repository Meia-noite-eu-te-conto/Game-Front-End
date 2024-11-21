function ShowRoomItemComponent(room) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-group-item', 'py-3', 'lh-sm');

    listItem.innerHTML = `
        <div class="d-flex w-100 align-items-center justify-content-between">
            <button class="bi bi-copy btn btn-sm btn-outline-primary copy-btn" data-room-code="${room["roomCode"]}">
            </button>
            <div class="w-75">
                <strong class="mb-1">${gameTypes[room["roomType"]]}: ${room["roomName"]}</strong>
                <div class="col-10 mb-1 small">Code: ${room["roomCode"]}</div>
            </div>
            <small class="text-body-secondary">${room["amountOfPlayers"]}/${room["maxAmountOfPlayers"]}</small>
        </div>
    `;

    return listItem;
}




