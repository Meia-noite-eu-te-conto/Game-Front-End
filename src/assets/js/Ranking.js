async function ShowRanking(filters, document) {
    const response = await RankingRepository.GetRankingAsync(filters, document);
    if (response.status === true) {
        const data = response.data;
        let paginatedGroup = document.getElementById("paginated-ranking");
        RoomPaginationComponent(paginatedGroup, data)

        let ranking = data["paginatedItems"]["Data"];
        const listGroup = document.getElementById('rooms-list');
        listGroup.innerHTML = ""
        ranking.forEach(e => {
            const listItem = document.createElement('div')
            listItem.innerHTML = `
            <div class="container mt-3">
                <div class="row border rounded p-2 shadow-sm">
                    <div class="col-4 font-weight-bold text-primary">Name: <span class="text-dark">${e.name}</span></div>
                    <div class="col-2">Total Points: <span class="text-success">${e.total_points}</span></div>
                    <div class="col-2">Wins: <span class="text-success">${e.total_wins}</span></div>
                    <div class="col-2">Losses: <span class="text-danger">${e.total_losses}</span></div>
                </div>
            </div>
            `
            listGroup.appendChild(listItem);
        });
    }
}