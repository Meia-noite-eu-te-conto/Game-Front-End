

const CreateRoomFormDataIds = {
    nickname: 'nickname-input',
    gameType: 'game-type-section',
    numberOfPlayers: 'number-of-players-section',
    roomName: 'room-name-input',
    isPrivate: 'private-room-checkbox'
}

async function CreateRoomAsync(event, document, window) {
    event.preventDefault();
    const formRoomData = {
        createdBy: document.getElementById(CreateRoomFormDataIds.nickname).value,
        roomType: document.getElementById(CreateRoomFormDataIds.gameType).value,
        maxAmountOfPlayers: document.getElementById(CreateRoomFormDataIds.numberOfPlayers).value,
        roomName: document.getElementById(CreateRoomFormDataIds.roomName).value,
        privateRoom: document.getElementById(CreateRoomFormDataIds.isPrivate).checked
    };
    const response = await RoomRepository.PostCreateRoomAsync(formRoomData)
    if (response.status === true) {
        redirectHrefRoom(window, response.data.roomCode, response.data.roomType)
    }
}

async function ShowRooms(filters, document) {
    const response = await RoomRepository.GetRoomsAsync(filters, document);
    if (response.status === true) {
        const data = response.data;
        let paginatedGroup = document.getElementById("paginated-list-rooms");
        RoomPaginationComponent(paginatedGroup, data, "listRooms");
        
        let rooms = data["paginatedItems"]["Data"];
        const listGroup = document.getElementById('rooms-list');
        listGroup.innerHTML = ""
        rooms.forEach(room => {
            const listItem = ShowRoomItemComponent(room);
            addCopyButtonEvent(listItem);
            listGroup.appendChild(listItem);
        });
    }
}

async function AddToRoomAsync(event, window) {
    event.preventDefault();
    const formData = {
        playerName: event.target.elements['nickname-input'].value,
        roomCode: event.target.elements['room-name-input'].value
    };
    const response = await RoomRepository.PutAddToRoomAsync(formData);
    console.log(response)
    if (response.status === true) {
        redirectHrefRoom(window, response.data.roomCode, response.data.roomType)
    }
}

function redirectHrefRoom(window, roomCode, roomType) {
    let pathName = roomType === 1 ?
        `${RouteNames["tournament"]}` :
        `${RouteNames["match"]}` ;

    if (window.location.pathname !== pathName) {
        window.location.href = `${pathName}?roomCode=${roomCode}`
    }
}

// Ajustar para o novo modelo de retorno
function GetPlayerColor(code) {
    return PlayerColor[code]
}

function addCopyButtonEvent(listItem) {
    const copyButton = listItem.querySelector('.copy-btn');
    copyButton.addEventListener('click', (event) => {
        event.preventDefault();
        const roomCode = copyButton.getAttribute('data-room-code');

        navigator.clipboard.writeText(roomCode).then(() => {
            const toastBody = document.querySelector('#roomCodeToast .toast-body');
            toastBody.textContent = `Room code "${roomCode}" copied to clipboard!`;

            const toastElement = document.getElementById('roomCodeToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }).catch((error) => {
            console.error('Failed to copy room code:', error);
        });
    });
}

function updateNumberOfPlayersOptions() {
    const gameTypeSelect = document.getElementById("game-type-section");
    const playersSelect = document.getElementById("number-of-players-section");

    const selectedGameType = gameTypeSelect.value;
    playersSelect.innerHTML = ""
    let options = [];
    if (selectedGameType === "0") {
        options = [2, 4];
    } else if (selectedGameType === "1") {
        options = [4, 8, 16];
    }

    let i = 0
    options.forEach(optionValue => {
        const optionElement = document.createElement("option");
        if (i == 0)
            optionElement.selected = true
        optionElement.value = optionValue;
        optionElement.textContent = optionValue;
        playersSelect.appendChild(optionElement);
        i++
    });
}