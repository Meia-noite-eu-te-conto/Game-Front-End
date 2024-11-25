function redirectIfuserIsActived(document, window) {
    let userId = getCookie(document, "userId")
    if (userId) {
        fetch(`/api/v1/user-session/players/${userId}/`)
        .then(response => {
            if (response.status === 204 || response.status === 500) return null
            return response.json()
        })
        .then(data => {
            if (data != null)
            {
                if (data["roomStatus"] <= 3) {
                    let pathName = "/watch-room.html"
                    let queryParams = `?roomCode=${data["roomCode"]}`;
                    let targetUrl = pathName + queryParams

                    console.log(window.location.pathname)
                    if (window.location.pathname !== pathName) {
                        console.log(data)
                        window.location.href = targetUrl;
                    }
                }
                // if (data["roomStatus"] > 3 && data["roomStatus"] <= 7)
                // {
                //     console.log(data)
                //     window.location.href = `/game.html?gameCode=${data["roomCode"]}`;
                // }
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

function resetUserIdIntoCookie(document) {
    document.cookie = `userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}