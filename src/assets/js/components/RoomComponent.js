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
        `<h1 class='modal-handler p-0 btn-remove-player h3 pe-2 bi bi-x-circle' data-target="alert-remove-player-modal" data-player-id="${player.id}"></h1>` :
        "");
}

function PlayerLabelComponent(data, player, createdBy, roomType) {
    let element = document.createElement('div')
    element.classList.add("list-group-item", "list-group-item-action", "py-3", "lh-sm", "rounded-4", "mb-2")
    
    let [r, g, b, a] = PlayerColor[player.profileColor]
    let rgbaPlayerColor = `style='background-color: rgba(${r}, ${g}, ${b}, ${a / 100})'`
    let owner = ""

    if (roomType != 2) {
        owner = RemovePlayerComponent(data, player, createdBy)
    }

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
    roomType = data["roomType"]
    
    const playerListElement = document.getElementById("list-of-players")
    playerListElement.innerHTML = ""

    let i = 0;
    players.forEach(player => {
        let playerElement = PlayerLabelComponent(data, player, createdBy, roomType)
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
                <a data-room-code="${data["roomCode"]}" data-target="alert-close-room-modal" class="btn modal-handler btn-lg btn-secondary">Close Room</a>
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
            <button data-player-code="${userId}" data-target="alert-leave-room-modal" class="btn modal-handler btn-lg btn-secondary">Leave Room</button>
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
        "Be careful. This game will be deleted if you close it.<br>Do you want to continue?",
        "btn-close-room",
        "Yes",
        "No"
    ))

    document.body.appendChild(AddModalComponent(
        "alert-leave-room-modal",
        "leave room.",
        "bi bi-exclamation-circle-fill",
        "Leave Game",
        "Are you sure you want to leave this game?",
        "btn-leave-the-room",
        "Yes",
        "No"
    ))

    document.body.appendChild(AddModalComponent(
        "alert-remove-player-modal",
        "remove player.",
        "bi bi-exclamation-circle-fill",
        "Remove Player",
        "Are you sure you want to remove this player from the game?",
        "btn-remove-player",
        "Yes",
        "No"
    ))
}

function PlayerLabelTournamentComponent(player, index)
{
    let element = document.createElement("div")
    element.classList.add("list-group-item", "list-group-item-action", "py-2", "lh-sm", "rounded-4", "mb-1")
    if (player === null)
        element.classList.add("bg-dark", "text-white")
    let [r, g, b, a] = player ? PlayerColor[player.color] : [0, 0, 0, 0];
    element.innerHTML = `
        <div class="d-flex w-100 align-items-center justify-content-between">
            <div class="d-flex w-100 align-items-center">
                <img class="rounded-circle img-thumbnail" style="background-color: rgba(${r}, ${g}, ${b}, ${a / 100})" src="${ player === null ? "/assets/img/none.png" : player["urlProfileImage"]}" alt="">
                <div class="d-flex flex-column ps-2 justify-content-center">
                    <strong class="mb-1">${ player === null ? "None" : player["name"]}</strong>
                    ${player === null ? "<p class='small mb-0'>waiting</p>" : ""}
                </div>
            </div>
            <h3 class="ps-3 text-body-secondary">${index}</h3>
        </div>
    `
    return element
}

function BracketsRowsComponent(data) {
    let tournamentList = document.getElementById("tournament-brackets");
    let brackets = document.createElement("div")
    let bracketsRow = document.createElement("div")
    
    tournamentList.innerHTML = ""
    
    let step = TournamentConfig["amountPlayersByBracketsRow"]
    let players = data["players"]
    for (i = 1; i <= data["maxNumberOfPlayers"]; i++) {

        let playerElement = PlayerLabelTournamentComponent(players[`${i}`], i)
        brackets.appendChild(playerElement)
        if (i % TournamentConfig["amountPlayersByBrackets"] === 0) {
            brackets.classList.add("my-2")
            bracketsRow.appendChild(brackets)
            brackets = document.createElement("div")
        }

        if (i === step) {
            bracketsRow.classList.add("w-100", "d-flex", "flex-row", "justify-content-around")
            tournamentList.appendChild(bracketsRow)
            bracketsRow = document.createElement("div")
            step += TournamentConfig["amountPlayersByBracketsRow"]
        }
    }
}

function TournamentInformationComponent(data) {
    let tournamentInfo = document.getElementById("tournament-info")
    tournamentInfo.classList.add("w-100", "d-flex", "pb-5", "flex-row", "justify-content-start")

    tournamentInfo.innerHTML = `
        <div class="pe-4 border-end border-dark border-3">
            <h1 class="mb-0" style="font-size: 65px">${data["numberOfPlayers"]}/${data["maxNumberOfPlayers"]}</h1>
            <p class="mb-0">players in tournament</p>
        </div>
        <div class="ps-4">
            <h1>${GamesType[data["roomType"]]}: ${data["roomName"]}</h1>
            <p>It will be possible to start the match as soon as there is the minimum number of players.</p>
        </div>
    `

}

async function TournamentActionsComponent(data, roomCode) {
    let elementActions = document.getElementById("tournament-action")
    elementActions.classList.add("h-100", "d-flex", "flex-column", "align-items-end", "justify-content-end")

    let historyList = await TournamentHistoryComponent(roomCode)
    elementActions.appendChild(historyList)

    if (data["tournamentOwner"])
    {
        let btnSection = document.createElement("div") 
        btnSection.classList.add("d-flex", "justify-content-end", "w-100")
        btnSection.innerHTML = `
            <button type="button" class="btn btn-lock-tournament btn-lg btn-dark">Lock Tournament</button>
        `
        elementActions.appendChild(btnSection)
    }

    if (data["owner"]) {
        let btnSection = document.createElement("div") 
        btnSection.classList.add("d-flex", "justify-content-end", "w-100")
        btnSection.innerHTML = `
            <button type="button" class="btn btn-start-tournament-game btn-lg btn-dark">Start Game</button>
        `
        elementActions.appendChild(btnSection)
    }
}

async function TournamentRoomComponent(data, roomCode) {
    await TournamentActionsComponent(data, roomCode)
    TournamentInformationComponent(data)
    BracketsRowsComponent(data)
}

function TournamentHistoryItemComponent(game) {
    let element = document.createElement("li")
    element.classList.add("list-group-item", "list-group-item-action", "py-2", "lh-sm", "rounded-2", "mb-1", "d-flex", "justify-content-between", "align-items-center")
    element.innerHTML = `
        <div class="d-flex align-items-center">
            <img class="border border-primary border-5 me-2 rounded-circle" src="${game["0"]["profileImage"]}" alt="" style="width: 35px; height: 35px">
            <p class="me-2 mb-0">${game["0"]["name"].slice(0, 6)}</p>
            <p class="mb-0">${game["0"]["score"]}</p>
        </div>
        <div>X</div>
        <div class="d-flex align-items-center">
            <img class="border border-danger border-5 me-2 rounded-circle" src="${game["0"]["profileImage"]}" alt="" style="width: 35px; height: 35px">
            <p class="pe-2 mb-0">${game["1"]["name"].slice(0, 6)}</p>
            <p class="mb-0">${game["1"]["score"]}</p>
        </div>
    `
    return element
}

async function TournamentHistoryComponent(roomCode) {
    let element = document.createElement("div")
    element.classList.add("w-100", "mb-3")

    let elementHeader = document.createElement("p")
    elementHeader.classList.add("mb-3")
    elementHeader.innerHTML = `
        <b>Games history</b>
        </br>
        <small>History of games result in this tournament.</small>
    `
    element.appendChild(elementHeader)

    
    let paginatedGames = await getTournamentGamesHistoryPaginated(null, roomCode);
    console.log(paginatedGames)
    let historyElement = document.createElement("ul")
    historyElement.classList.add("list-group")
    historyElement.id = "tournament-history"

    paginatedGames["games"].forEach(game => {
        let item = TournamentHistoryItemComponent(game)
        historyElement.appendChild(item)
    });

    element.appendChild(historyElement)

    let paginatedHistory = document.createElement("div")
    paginatedHistory.classList.add("pagination", "mt-1", "justify-content-center")
    paginatedHistory.id = "tournament-history-pagination"
    PaginationComponent(paginatedHistory, paginatedGames, "getTournamentGamesHistoryPaginated");
    
    element.appendChild(paginatedHistory)

    return element
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
                    <button type="button" class="btn btn-lg btn-secondary" data-bs-dismiss="modal">${noBtnName}</button>
                    <button type="button" class="btn btn-lg ${actionClass} btn-dark" data-bs-dismiss="modal">${yesBtnName}</button>
                </div>
            </div>
        </div>
    `
    return modal
}
