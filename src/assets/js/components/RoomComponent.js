function ShowRoomItemComponent(room)
{
    const listItem = document.createElement('a');
    listItem.classList.add('list-group-item', 'list-group-item-action', 'py-3', 'lh-sm');
    listItem.href = '#';
    listItem.innerHTML = `
    <div class="d-flex w-100 align-items-center justify-content-between">
        <strong class="mb-1">${gameTypes[room["roomType"]]}: ${room["roomName"]}</strong>
        <small class="text-body-secondary">${room["amountOfPlayers"]}/${room["maxAmountOfPlayers"]}</small>
    </div>
    <div class="col-10 mb-1 small">Code: ${room["roomCode"]}</div>
    `;
    return listItem;
}




