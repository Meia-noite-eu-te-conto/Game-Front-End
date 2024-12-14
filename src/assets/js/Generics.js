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
                    redirectHrefRoom(window, data["roomCode"], data["roomType"])
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

function ApiRequestHandler(endpoint, method = 'GET', body = null, additionalHeaders = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'X-User-Id': getCookie(document, "userId"),
        ...additionalHeaders,
    };

    return fetch(endpoint, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });
}

function handleApiError(error) {
    console.error("API error:", error);
}

function handleApiSuccess(response, successCallback) {
    if (response.ok) {
        successCallback && successCallback(response);
    } else {
        console.error(`API request failed with status ${response.status}`);
    }
}