const btnActions = {
    "btn-close-room": CloseRoom,
    "btn-remove-player": RemovePlayerFromRoom,
    "btn-start-game": StartAGame,
    "btn-start-tournament-game": StartATournamentGame,
    "btn-leave-the-room": LeaveTheRoom,
    "btn-lock-tournament": LockTournament,
};

const btnPageActions = {
    "btn-open-list-rooms" : DOMRender
}

class PageHome {
    async init() {
        console.log("Init Page Home")

    }
    
    async destroy() {
        console.log("Destroy Page Home")
    }
}

class PageViewRooms {
    async init() {
        renderHeader(document);
        listRooms();
        

    }
    
    async destroy() {
        console.log("Destroy Page View Rooms")
    }
}

class Ranking {
    async init () {
        renderHeader(document);
        listRanking();


    }

    async destroy() {
        console.log("Destroy Page View Rooms")
    }
}

class PageGame {
    async init() {
        const	host = window.location.host;
        const	endpoint = `/api/v1/game-core/games/${localStorage.getItem("gameId")}/`;
		const	userId = getCookie(document, "userId");

        gCanvas = document.getElementById('myCanvas');
		gl = gCanvas.getContext('webgl2');
		

        renderHeader(document)
        getPlayer(localStorage.getItem("gameId"))

        const socket = new WebSocket(`wss://${host}${endpoint}`);

        socket.onopen = function(event) {
            const headers = { "X-User-Id": getCookie(document, "userId")};

            socket.send(JSON.stringify({
                type: 'connect',
                headers: headers
            }));

            WSConnection(document, true)
        };

        document.addEventListener('keydown', sendKey);
		
        function	sendKey(event)
		{
			const	key = event.key;
			socket.send(JSON.stringify({
				direction: key,
				headers: { "X-User-Id": userId }
			}));
		}


        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            if (data.type == 'game.update') {
                drawOnCanvas(data.game_state);
            }

            if (data.type === "update_score") {
                let playerColor = data.playerColor
                let element = document.getElementById(`player-${playerColor}`)
                element.innerHTML = data.playerScore
            }

            if (data.type === "game_finished") {
                if (data.winner != userId) {
                    const gameOverLoserModal = new bootstrap.Modal(document.getElementById('gameOverLoserModal'));
                    gameOverLoserModal.show();
                }
                else {
                    if (data.roomType === 1)
                        window.location.href = `/tournament.html?roomCode=${this.roomCode}`;
                    else {
                        const gameOverWinnerModal = new bootstrap.Modal(document.getElementById('gameOverWinnerModal'));
                        gameOverWinnerModal.show();
                    }
                }
            }
        };

        socket.onclose = function(event) {
            WSConnection(document, false)
        };

        socket.onerror = function(error) {
            console.error("WebSocket error:", error);
        };
    }

    async destroy() {

    }
}

class PageMatchRoom {

    async init() {
        renderHeader(document)

        await ShowMatchRoom(localStorage.getItem("roomCode"))

        const userId = getCookie(document, "userId")
        const host = window.location.host;
        const endpoint = "/api/v1/user-session/";
        const socket = new WebSocket(`wss://${host}${endpoint}ws/rooms/${localStorage.getItem("roomCode")}/?userId=${userId}`);

        socket.onopen = function(event) {
            WSConnection(document, true)
        };
    
        socket.onmessage = async function(event) {
            console.log("watch-room.html \n WebSocket message:", event.data);
            const data = JSON.parse(event.data);
            if (data.type == "delete_room" || (data.type == "player_list_update" && data.userRemoved == userId)) {
                resetUserIdIntoCookie(document)
                DOMRender("/home.html")
            } else if (data.type == "player_list_update")
                await ShowMatchRoom(localStorage.getItem("roomCode"));
            else if (data.type == "game.started") {
                redirectGame(data.gameId)
            }
        };
    
        socket.onclose = function(event) {
            WSConnection(document, false)
        };
    
        socket.onerror = function(error) {
            console.error("WebSocket error:", error);
        };
    }

    async destroy() {

    }
}

class PageTournament {
    async init () {
        const userId = getCookie(document, "userId")

        const host = window.location.host;
        const endpoint = "/api/v1/user-session/";
        const socket = new WebSocket(`wss://${host}${endpoint}ws/rooms/${localStorage.getItem("roomCode")}/?userId=${userId}`);

        renderHeader(document)
        ShowTournamentRoom(localStorage.getItem("roomCode"))

        socket.onopen = function(event) {
            console.log("WebSocket connection established:", event);
			WSConnection(document, true)
		};

		socket.onmessage = function(event) {
            console.log("tournament.html \n WebSocket message:", event.data);
            const data = JSON.parse(event.data);
            if (data.type == "delete_room" || (data.type == "player_list_update" && data.userRemoved == userId)) {
                resetUserIdIntoCookie(document)
                DOMRender("/home.html")
            } else if (data.type == "player_list_update")
                ShowTournamentRoom(localStorage.getItem("roomCode"));
            else if (data.type == "game.started") {
                window.location.href = `/game.html?gameId=${data.gameId}&roomCode=${this.roomCode}`
            }
		};

        socket.onclose = function(event) {
            console.log("WebSocket connection closed:", event);
			WSConnection(document, false)
		};

        socket.onerror = function(error) {
            console.error("WebSocket error:", error);
        };

        console.log("tournament Page")
    }
    
    async destroy() {
        console.log("tournament Page")

    }
}

class Router {

    constructor() {
        this.page = localStorage.getItem("currentPage") ? localStorage.getItem("currentPage") : "/home.html"
        this.prevPage = "/home.html"
        this.actions = {
            "/home.html": new PageHome(),
            "/view-rooms.html": new PageViewRooms(),
            "/ranking.html": new Ranking(),
            "/watch-room.html": new PageMatchRoom(),
            "/tournament.html": new PageTournament(),
            "/game.html": new PageGame()
        }
        localStorage.setItem("currentPage", this.page)
        this.roomCode = localStorage.getItem("roomCode") ? localStorage.getItem("roomCode") : null
        this.gameId = localStorage.getItem("gameId") ? localStorage.getItem("gameId") : null
        this.isF5 = true

        document.addEventListener("click", async event => {
            await HandleEvents(event, this.roomCode)
        });
    }

    async navigateTo(newPage) {
        if (this.actions[newPage]) {
            if (this.page !== newPage || this.isF5) {
                const currentActions = this.actions[this.page];
                if (currentActions && currentActions.destroy) {
                    await currentActions.destroy();
                }
                const newActions = this.actions[newPage];
                if (newActions && newActions.init) {
                    await newActions.init();
                }
                this.isF5 = false
            }

            this.prevPage = this.page
            this.page = newPage
            localStorage.setItem("currentPage", this.page)
        }
    }

    updateRoomCode(roomCode) {
        this.roomCode = roomCode
        localStorage.setItem("roomCode", this.roomCode)
        Object.values(this.actions).forEach(page => {
            page.roomCode = this.roomCode
        });
    }

    updateGameId(gameId) {
        this.gameId = gameId
        localStorage.setItem("gameId", this.gameId)
        Object.values(this.actions).forEach(page => {
            page.gameId = this.gameId
        });
    }
}


async function HandleEvents(event, roomCode) {
    if (event.target.matches(".modal-handler")) {
        event.preventDefault()
        const targetModalId = event.target.dataset.target;
        const modalElement = document.getElementById(targetModalId);
        const playerId = event.target.dataset.playerId;

        modalElement.dataset.playerId = playerId;

        var modal = new bootstrap.Modal(modalElement);
        modal.show();
        return
    }

    if (event.target.matches(".btn") || event.target.matches(".act")) {
        for (const [className, action] of Object.entries(btnActions)) {
            if (event.target.classList.contains(className)) {
                event.preventDefault()
                action(event, roomCode);
                return;
            }
        }
        for (const [className, action] of Object.entries(btnPageActions)) {
            if (event.target.classList.contains(className)) {
                event.preventDefault()
                await action(event.target.dataset.pageName);
                return;
            }
        }
    }
}