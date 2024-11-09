/*
    import { RoutesInfo } from "./repositories/RoutesInfo";
    import { CustomError } from "../utils/CustomError";
*/

const route = "rooms"
async function PostCreateRoomAsync(roomData) {
    const response = await fetch(`${RoutesInfo.userSessionAPI}/${route}/new-room/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomData)
    })
    .then(async response => {
        if (response.status === 201) {
            const data = await response.json();
            const userId = response.headers.get("userId");

            if (userId) {
                document.cookie = `userId=${userId}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/`;
            }
            return ({
                status: response.status,
                data
            });
        }
        return (ProcessErrors(response, {"title": "Error on Create Room", "message": "Not Found"} ))
    })
    .then(({ status, data }) => {
        console.log('Room created successfully:', status, data);
        return { "status": true, "data": data }
    })
    .catch(error => {
        if (error instanceof CustomError) {
            return {"status": false, "title": error.title, "message": error.message}
        } else {
            return {"status": false, "title": "Not Expected", "message": error.message}
        }
    });
    return response
}

async function GetRoomsAsync(filters) {
    return await fetch(`${RoutesInfo.userSessionAPI}/${route}/?currentPage=${filters.currentPage}&pageSize=${filters.pageSize}&filterLabel=${filters.filterLabel}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
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

function ProcessErrors(response, error) {
    if (response.status >= 400 && response.status < 500) {
        throw new CustomError(error.title, error.message);
    } else if (response.status >= 500) {
        throw new CustomError("Erro do Servidor", `Erro ${response.status}: Tente novamente mais tarde.`);
    }
}

const RoomRepository = {
    PostCreateRoomAsync,
    GetRoomsAsync
}