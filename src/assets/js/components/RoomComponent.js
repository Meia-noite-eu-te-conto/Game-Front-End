function ShowRoomItemComponent(room) {
    // Cria o item de lista principal
    const listItem = document.createElement('div'); // Usei <div> para mais flexibilidade
    listItem.classList.add('list-group-item', 'py-3', 'lh-sm');

    // Adiciona o conteúdo principal
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

    // Seleciona o botão "Copy Code" dentro do item
    const copyButton = listItem.querySelector('.copy-btn');
    copyButton.addEventListener('click', (event) => {
        event.preventDefault(); // Previne comportamento padrão, caso seja necessário
        const roomCode = copyButton.getAttribute('data-room-code');

        // Copia o código para a área de transferência
        navigator.clipboard.writeText(roomCode).then(() => {
            alert(`Room code "${roomCode}" copied to clipboard!`);
        }).catch((error) => {
            console.error('Failed to copy room code:', error);
        });
    });

    return listItem;
}




