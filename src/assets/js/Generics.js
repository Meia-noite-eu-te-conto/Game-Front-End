function redirectIfuserIsActived(userId, window) {
    if (userId) {
        fetch(`/api/v1/user-session/players/${userId}/`)
        .then(response => {
            if (response.status === 204 || response.status === 500) return null
            return response.json()
        })
        .then(data => {
            if (data !== null && userId && data["roomStatus"] <= 3) {
                console.log(data)
                window.location.href = `/watch-room-owner.html?roomCode=${data["roomCode"]}`;
            }
        })
    }
}

function getUserSession(document) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("userId="))
        ?.split("=")[1];
}