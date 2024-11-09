/*
    import { RoomRepository } from "./repositories/RoomRepository";
*/

const CreateRoomFormDataIds = {
    nickname: 'nickname-input',
    gameType: 'game-type-section',
    numberOfPlayers: 'number-of-players-section',
    roomName: 'room-name-input',
    isPrivate: 'private-room-checkbox'
}

function CreateRoom(event, document, window) {
    event.preventDefault();
    const formRoomData = {
        createdBy: document.getElementById(CreateRoomFormDataIds.nickname).value,
        roomType: document.getElementById(CreateRoomFormDataIds.gameType).value,
        maxAmountOfPlayers: document.getElementById(CreateRoomFormDataIds.numberOfPlayers).value,
        roomName: document.getElementById(CreateRoomFormDataIds.roomName).value,
        privateRoom: document.getElementById(CreateRoomFormDataIds.isPrivate).checked
    };
    const response = RoomRepository.PostCreateRoom(formRoomData, "roomCodessdddsa")

    if (response.status === true) {
        const roomCode = data.roomCode; 
        window.location.href = `/watch-room-owner.html?roomCode=${roomCode}`;
    }
}


function GetPlayerColor(code) {
    return PlayerColor[code]
}

function RoomItemComponent(room)
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

function RoomPaginationComponent(paginatedGroup, data)
{
    paginatedGroup.innerHTML = "";
    const paginatedInfo = data["paginatedItems"]
    let item = PaginationItemLabelComponent(paginatedInfo["currentPage"], "Previous", paginatedInfo);
    paginatedGroup.appendChild(item);

    const totalPages = paginatedInfo["totalPages"];
    const currentPage = paginatedInfo["currentPage"];
    let startPage, endPage;

    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        item = PaginationItemComponent(page, currentPage);
        paginatedGroup.appendChild(item);
    }

    item = PaginationItemLabelComponent(paginatedInfo["currentPage"], "Next", paginatedInfo);
    paginatedGroup.appendChild(item);
}

function PaginationItemLabelComponent(currentPage, label, paginatedInfo)
{
    console.log()
    let page = label == "Previous" ? currentPage - 1 : currentPage + 1;
    let item = document.createElement('li');
    item.classList.add('page-item');
    paginatedInfo[`has${label}Page`] ? item.classList.remove('disabled') : item.classList.add('disabled');
    item.innerHTML = `
        <a class="page-link" onclick="listRooms(${page})">${label}</a>
    `;
    return item;
}

function PaginationItemComponent(page, currentPage)
{
    const item = document.createElement('li');
    item.classList.add('page-item');
    page === currentPage ? item.classList.add('active') : item.classList.remove('active');
    item.innerHTML = `
        <a class="page-link" onclick="listRooms(${page})">${page}</a>
    `;
    return item;
}

