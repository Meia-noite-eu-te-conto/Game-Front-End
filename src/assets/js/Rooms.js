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

async function CreateRoomAsync(event, document, window) {
    event.preventDefault();
    const formRoomData = {
        createdBy: document.getElementById(CreateRoomFormDataIds.nickname).value,
        roomType: document.getElementById(CreateRoomFormDataIds.gameType).value,
        maxAmountOfPlayers: document.getElementById(CreateRoomFormDataIds.numberOfPlayers).value,
        roomName: document.getElementById(CreateRoomFormDataIds.roomName).value,
        privateRoom: document.getElementById(CreateRoomFormDataIds.isPrivate).checked
    };
    const response = await RoomRepository.PostCreateRoomAsync(formRoomData, "roomCodessdddsa")
    if (response.status === true) {
        const roomCode = response.data.roomCode; 
        window.location.href = `/watch-room.html?roomCode=${roomCode}`;
    }
}

async function ShowRooms(filters, document) {
    const response = await RoomRepository.GetRoomsAsync(filters, document);
    if (response.status === true) {
        const data = response.data;
        let paginatedGroup = document.getElementById("paginated-list-rooms");
        RoomPaginationComponent(paginatedGroup, data)

        let rooms = data["paginatedItems"]["Data"];
        const listGroup = document.getElementById('rooms-list');
        listGroup.innerHTML = ""
        rooms.forEach(room => {
            const listItem = ShowRoomItemComponent(room);
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
    if (response.status === true) {
        window.location.href = `/watch-room.html?roomCode=${formData.roomCode}`;
    }
}


// Ajustar para o novo modelo de retorno
function GetPlayerColor(code) {
    return PlayerColor[code]
}










