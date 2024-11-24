function redirectIfuserIsActived(document, window) {
    let userId = getCookie(document, "userId")
    if (userId) {
        fetch(`/api/v1/user-session/players/${userId}/`)
        .then(response => {
            if (response.status === 204 || response.status === 500) return null
            return response.json()
        })
        .then(data => {
            if (data !== null) {
                if (data["roomStatus"] <= 3) {
                    const targetUrl = `/watch-room.html?roomCode=${data["roomCode"]}`;
                    if (window.location.href != window.location.origin + targetUrl) {
                        window.location.href = `/watch-room.html?roomCode=${data["roomCode"]}`;
                    }
                }
            }
        })
    }
}

function getCookie(document, cookieName) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(`${cookieName}=`))
        ?.split("=")[1];
}

function addUserIdIntoCookie(document, userId) {
    if (userId) {
        document.cookie = `userId=${userId}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; SameSite=None; Secure`;
    }
}