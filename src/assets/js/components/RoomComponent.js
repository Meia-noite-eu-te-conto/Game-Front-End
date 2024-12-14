function ShowRoomItemComponent(room) {
    const listItem = document.createElement('div');
    listItem.classList.add('list-group-item', 'py-3', 'lh-sm');

    listItem.innerHTML = `
        <div class="d-flex w-100 align-items-center justify-content-between">
            <button class="bi bi-copy btn btn-sm btn-outline-primary copy-btn" data-room-code="${room["roomCode"]}">
            </button>
            <div class="w-75">
                <strong class="mb-1">${gameTypes[room["roomType"]]}: ${room["roomName"]}</strong>
                <div class="col-10 mb-1 small">Code: ${room["roomCode"]}</div>
            </div>
            <small class="text-body-secondary">${room["amountOfPlayers"]}/${room["maxAmountOfPlayers"]}</small>
        </div>
    `;

    return listItem;
}

function RemovePlayerComponent (data, player, createdBy) {
    return (player.id == createdBy) ?
    "<small class='text-body-secondary bi bi-person'> Owner</small>" :
    (data["isOwner"] ?
        `<h1 class='act p-0 btn-remove-player h3 pe-2 bi bi-x-circle' data-player-code="${player.id}"></h1>` :
        "");
}

function PlayerLabelComponent(data, player, createdBy) {
    let element = document.createElement('div')
    element.classList.add("list-group-item", "list-group-item-action", "py-3", "lh-sm", "rounded-4", "mb-2")
    
    let [r, g, b, a] = PlayerColor[player.profileColor]
    let rgbaPlayerColor = `style='background-color: rgba(${r}, ${g}, ${b}, ${a / 100})'`
    let owner = RemovePlayerComponent(data, player, createdBy)

    element.innerHTML = `
        <div class="d-flex w-100 align-items-center justify-content-between">
            <div class=" d-flex w-75 align-items-center">
                <img ${rgbaPlayerColor} src="${player.urlProfileImage}" class="rounded-circle img-thumbnail" alt="">
                <div class="d-flex flex-column  ps-2 justify-content-center">
                    <strong class="mb-1">${player.name}</strong>
                    <p class="small mb-0">${PlayerColorLabel[player.profileColor]}</p>
                </div>
            </div>
            ${ owner }
        </div>
    `
    return element
}

function NonePlayerLabelComponent() {
    const element = document.createElement('div');
    element.classList.add("disabled", "list-group-item", "list-group-item-action", "py-3", "lh-sm", "rounded-4", "mb-2", "bg-secondary")
    element.innerHTML = `
        <div class="d-flex w-100 align-items-center justify-content-between">
            <div class="d-flex w-75 align-items-center">
                <img class="rounded-circle img-thumbnail" src="./assets/img/none.png" alt="">
                <div class="d-flex flex-column  ps-2 justify-content-center">
                    <strong class="mb-1"></strong>
                    <p class="small mb-0"></p>
                </div>
            </div>
        </div>
        `;
    return element
}


function MatchPlayerListComponent(data) {
    players = data["players"]
    createdBy = data["createdBy"]
    
    const playerListElement = document.getElementById("list-of-players")
    playerListElement.innerHTML = ""

    let i = 0;
    players.forEach(player => {
        let playerElement = PlayerLabelComponent(data, player, createdBy)                       
        playerListElement.appendChild(playerElement)
        i++;
    });

    while (i < data.maxAmountOfPlayers)
    {
        let nonePlayerElement = NonePlayerLabelComponent()
        playerListElement.appendChild(nonePlayerElement)
        i++;              
    }
}

function MatchGameInformationComponent(data) {
    const roomNameElement = document.getElementById("room-name")
    roomNameElement.innerHTML = `
        <div>
            <h1>${GamesType[data["roomType"]]}: ${data["roomName"]}</h1>
            <p>It will be possible to start the match as soon as there is the minimum number of players.</p>
        </div>
        `
}

function CloseRoomButtonComponent(data) {
    return  `<p class="lead px-3">
                <a data-room-code="${data["roomCode"]}" data-targert="alert-close-room-modal" class="btn modal-handler btn-lg btn-secondary">Close Room</a>
            </p>`
 }

 function StartGameButttonComponent() {
    return `<p class="lead px-3">
                <button type="button" class="btn btn-start-game btn-lg btn-dark">Start Game</button>
            </p>`
 }

function LeaveRoomButtonComponent(userId) {
    return `
        <p class="lead px-3">
            <button data-player-code="${userId}" class="btn btn-leave-the-room btn-lg btn-secondary">Leave Room</button>
        </p>
        `
}

function MatchActionsComponent(data) 
{
    let element = document.getElementById("room-actions")
    let btnSection = LeaveRoomButtonComponent(data)

    if (data["isOwner"]) 
    {
        btnSection = `
        ${CloseRoomButtonComponent(data)}
        ${StartGameButttonComponent()}
        `
    }

    element.innerHTML = `
    <a class="w-75 bi bi-copy btn btn-dark copy-btn" data-room-code="${data["roomCode"]}"> Room Code: ${data["roomCode"]}</a>
    <div class="d-flex align-items-end justify-content-between">
        ${btnSection}
    </div>
    `
    addCopyButtonEvent(document);
}

function MatchRoomComponent(data) {
    MatchGameInformationComponent(data)
    MatchPlayerListComponent(data)
    MatchActionsComponent(data)

    document.body.appendChild(AddModalComponent(
        "alert-close-room-modal",
        "close room.",
        "bi bi-exclamation-circle-fill",
        "Close Game",
        "You are careful to close the starting room.<br>Do you want to continue?",
        "btn-close-room",
        "yes",
        "no"
    ))
}



function AddModalComponent(
    modalName, 
    description,
    icon,
    title,
    content,
    actionClass,
    yesBtnName,
    noBtnName
) {
    let modal = document.createElement("div")
    modal.classList.add("modal", "fade")
    modal.setAttribute('id', modalName);
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', description);
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center">
                <div class="modal-header align-items-start">
                    <div class="w-100">
                        <h1 class="${icon}"></h1>
                        <h4 class="modal-title" id="${modalName}-title">${title}</h4>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <div class="modal-body">
                ${content}
                </div>

                <div class="modal-footer mb-3 w-100">
                    <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">${noBtnName}</button>
                    <button type="button" class="btn btn-lg ${actionClass} btn-dark">${yesBtnName}</button>
                </div>
            </div>
        </div>
    `
    return modal
}
