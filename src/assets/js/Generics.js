async function redirectIfuserIsActived(document, window) {
    let userId = getCookie(document, "userId")
    if (userId) {
        await fetch(`/api/v1/user-session/players/${userId}/`)
        .then(async response => {
            if (response.status === 204 || response.status === 500) return null
            return response.json()
        })
        .then(async data => {
            if (data != null)
            {
                if (data["roomStatus"] <= 3) {
                    await redirectHrefRoom(window, data["roomCode"], data["roomType"])
                }
            }
        })
    }
}

function getCookie(document, cookieName) {
    return localStorage.getItem('userId');
}

function addUserIdIntoCookie(document, userId) {
    if (userId) {
        localStorage.setItem('userId', userId);
    }
}

function addCookie(document,cookieName, value) {
    if (cookieName && value) {
        localStorage.setItem(itemName, value);
    }
}

function resetUserIdIntoCookie(document) {
    localStorage.removeItem('userId');
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

async function handleApiSuccessAsync(response, successCallback) {
    if (response.ok) {
        if (successCallback) { return await successCallback(response) };
    } else {
        console.error(`API request failed with status ${response.status}`);
    }
}

async function DOMRender(pageName, addToHistory = true) {
    const response = await fetch(pageName)
    .then( response => response.text())
    const root = document.getElementById("root")
    root.innerHTML = response

    await window.routes.navigateTo(pageName, addToHistory)
}

