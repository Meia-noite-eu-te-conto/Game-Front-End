const HeaderInfo = [
    {
        "type": "link",
        "name": "Game",
        "url": "/",
        "activeWhen": "/"
    },
    {
        "type": "link",
        "name": "Community",
        "url": "/",
        "activeWhen": "/Community"
    },
    {
        "type": "link",
        "name": "Ranking",
        "url": "/",
        "activeWhen": "/Ranking"
    },
    {
        "type": "link",
        "name": "Store",
        "url": "/",
        "activeWhen": "/Store"
    },
    {
        "type": "link",
        "name": "Profile",
        "url": "/",
        "activeWhen": "Profile"
    },
    {
        "type": "btn",
        "name": "Login",
        "btn-type": "btn-secondary",
    },
    {
        "type": "btn",
        "name": "Register",
        "btn-type": "btn-dark",
    }
]

function HeaderComponent(document) {
    let element = document.createElement("header")
    
    element.classList.add(
        'd-flex', 
        'flex-wrap', 
        'justify-content-center',
        'py-3',
        'border-bottom'
    )
    element.appendChild(BrandIconComponent(document))
    element.appendChild(NavComponent(document))
    return element
}

function NavComponent(document) {
    let element = document.createElement("ul")
    element.classList.add(
        'nav', 
        'nav-pills'
    )

    HeaderInfo.forEach(btn => {
        const status = checkActiveSection("/", btn["activeWhen"])
        let item = document.createElement("li")
        item.classList.add("nav-item")
        if (btn["type"] == "link")
            item.innerHTML = `<a href="${btn["url"]}" class="nav-link ${status}" aria-current="page">${btn["name"]}</a>`
        else 
            item.innerHTML = `<button class="btn ${btn["btn-type"]} mx-2">${btn["name"]}</button>`
        element.appendChild(item)
    });
    return element
}

function BrandIconComponent(document) {
    let element = document.createElement("a")
    element.classList.add(
        'd-flex',
        'align-items-center',
        'ms-5',
        'mb-md-0',
        'me-md-auto',
        'link-body-emphasis',
        'text-decoration-none'
    )
    element.href = "/"
    element.innerHTML = `
                <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6548 2H11.8214C10.2743 2 8.7906 2.61458 7.69664 3.70854C6.60268 4.80251 5.9881 6.28624 5.9881 7.83333C5.9881 9.38043 6.60268 10.8642 7.69664 11.9581C8.7906 13.0521 10.2743 13.6667 11.8214 13.6667M17.6548 2V13.6667M17.6548 2H23.4881C38.2635 3 38.5 27.0419 17.6548 19.5M17.6548 13.6667H11.8214M17.6548 13.6667V19.5M11.8214 13.6667C10.2743 13.6667 8.7906 14.2812 7.69664 15.3752M17.6548 25.3333H11.8214C10.2743 25.3333 8.7906 25.9479 7.69664 27.0419C6.60268 28.1358 5.9881 29.6196 5.9881 31.1667C5.9881 32.7138 6.60268 34.1975 7.69664 35.2915C8.7906 36.3854 10.2743 37 11.8214 37C13.3685 37 14.8523 36.3854 15.9462 35.2915C17.0402 34.1975 17.6548 32.7138 17.6548 31.1667V25.3333ZM17.6548 25.3333V19.5" stroke="#1E1E1E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
    `
    return element
}

function checkActiveSection(pathUrl, pattern) {
    if (pathUrl == pattern)
        return "active"
    return "deactive"
}