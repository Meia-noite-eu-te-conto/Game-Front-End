const btnActions = {
    "btn-close-room": CloseRoom,
    "btn-remove-player": RemovePlayerFromRoom,
    "btn-start-game": StartAGame,
    "btn-leave-the-room": LeaveTheRoom,
};

function HandleEvents(event, roomCode) {
    if (event.target.matches(".modal-handler")) {
        event.preventDefault()
        var modal = new bootstrap.Modal(document.getElementById(event.target.dataset.targert));
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