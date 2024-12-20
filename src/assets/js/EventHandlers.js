const btnActions = {
    "btn-close-room": CloseRoom,
    "btn-remove-player": RemovePlayerFromRoom,
    "btn-start-game": StartAGame,
    "btn-start-tournament-game": StartATournamentGame,
    "btn-leave-the-room": LeaveTheRoom,
};

function HandleEvents(event, roomCode) {
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
    }
}