const route = "rooms"

async function GetRoomsAsync(filters, document) {
    return await fetch(`${RoutesInfo.userSessionAPI}/${route}/?currentPage=${filters.currentPage}&pageSize=${filters.pageSize}&filterLabel=${filters.filterLabel}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-User-Id': getCookie(document, "userId")
        }
    })
    .then(async response => {
        if (response.ok) {
            const data = await response.json();
            return ({
                status: response.status,
                data
            });
        }
        return (ProcessErrors(response, {"title": "Error on Get Rooms", "message": "Not Found"} ))
    })
    .then(({ status, data }) => {
        console.log('Rooms fetched successfully:', status, data);
        return { "status": true, "data": data }
    })
    .catch(error => {
        if (error instanceof CustomError) {
            return {"status": false, "title": error.title, "message": error.message}
        } else {
            return {"status": false, "title": "Not Expected", "message": error.message}
        }
    });
}

async function PutAddToRoomAsync(FormData) {
    return await fetch(`${RoutesInfo.userSessionAPI}/${route}/${FormData.roomCode}/add-player/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
    })
    .then(async response => {
        console.log("Status: " + response.status)
        if (response.status === 201) {
            const userId = response.headers.get("X-User-Id");
            let data = await response.json();
            addUserIdIntoCookie(document, userId)
            return ({
                status: response.status,
                data
            });
        }
        return (ProcessErrors(response, {"title": "Error on Add To Room", "message": "Not Found"} ))
    })
    .then(({ status, data }) => {
        console.log('User added to room successfully:', status);
        return { "status": true, "data": data }
    })
    .catch(error => {
        if (error instanceof CustomError) {
            return {"status": false, "title": error.title, "message": error.message}
        } else {
            return {"status": false, "title": "Not Expected", "message": error.message}
        }
    });
}

function ProcessErrors(response, error) {
    if (response.status >= 400 && response.status < 500) {
        throw new CustomError(error.title, error.message);
    } else if (response.status >= 500) {
        throw new CustomError("Erro do Servidor", `Erro ${response.status}: Tente novamente mais tarde.`);
    }
}

const APIEndPoints = {
    'user': '/api/v1/user-session/',
    'uws': '',
    'game': '/api/v1/game-core/',
}

function CloseRoom(event, roomCode) {
    const endpoint = `${APIEndPoints["user"]}rooms/${roomCode}/delete`;
    ApiRequestHandler(endpoint, 'DELETE')
        .then(response => {
            handleApiSuccess(response, () => {
                resetUserIdIntoCookie(document);
                window.location.href = "/index.html";
            });
        })
        .catch(handleApiError);
}

function RemovePlayerFromRoom(event, roomCode) {
    const modal = event.target.closest(".modal");
    const playerId = modal.dataset.playerId;

    const endpoint = `${APIEndPoints["user"]}rooms/${roomCode}/${playerId}/remove-player/`;
    ApiRequestHandler(endpoint, 'DELETE')
        .then(response => {
            handleApiSuccess(response, () => {
                alert("Colocar um aviso de que o player saiu igual ao que aparece quando copiamos coisas.")
            })
        })
        .catch(handleApiError)
}

function StartAGame(event, roomCode) {
    const endpoint = `${APIEndPoints["user"]}games/${roomCode}/new-game/`;
    ApiRequestHandler(endpoint, 'POST')
        .then(response => {
            handleApiSuccess(response, () => {
                // This action ws do.
            });
        })
        .catch(handleApiError);
}

function LeaveTheRoom(event, roomCode) {
    let userId = getCookie(document, "userId");
    const endpoint = `${APIEndPoints["user"]}rooms/${roomCode}/${userId}/remove-player/`;
    ApiRequestHandler(endpoint, 'DELETE')
        .then(response => {
            handleApiSuccess(response, () => {
                alert("Colocar um aviso de que o player saiu igual ao que aparece quando copiamos coisas.")
            })
        })
        .catch(handleApiError)
}

function CreateRoom(event) {
    event.preventDefault()
    const data = {
        createdBy: event.target.nickname.value,
        roomType: event.target.gameType.value,
        maxAmountOfPlayers: event.target.numberOfPlayers.value,
        roomName: event.target.roomName.value,
        privateRoom: event.target.isPrivate.checked
    }

    const endpoint = `${APIEndPoints["user"]}rooms/new-room/`;
    ApiRequestHandler(endpoint, 'POST', body = data)
        .then(response => {
            handleApiSuccess(response, async () => {
                const userId = response.headers.get("X-User-Id");
                const data = await response.json();
                addUserIdIntoCookie(document, userId);
                redirectHrefRoom(window, data.roomCode, data.roomType)
            })
        })
        .catch(handleApiError)
}

function ShowMatchRoom(roomCode) {
    const endpoint = `${APIEndPoints["user"]}rooms/${roomCode}/detail`;
    ApiRequestHandler(endpoint, 'GET')
        .then(response => {
            handleApiSuccess(response, async () => {
                const data = await response.json();
                MatchRoomComponent(data)
            })
        })
        .catch(handleApiError)
}

function ShowTournamentRoom(roomCode) {
    const endpoint = `${APIEndPoints["user"]}rooms/${roomCode}/tournament`;
    ApiRequestHandler(endpoint, 'GET')
        .then(response => {
            handleApiSuccess(response, async () => {
                const data = await response.json();
                console.log(data)
                TournamentRoomComponent(data)
            })
        })
        .catch(handleApiError)
}

const RoomRepository = {
    // Player Actions
    CloseRoom,
    LeaveTheRoom,
    RemovePlayerFromRoom,
    StartAGame,

    CreateRoom,
    ShowMatchRoom,
    ShowTournamentRoom,

    GetRoomsAsync,
    PutAddToRoomAsync
}