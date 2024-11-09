function PaginationItemLabelComponent(currentPage, label, paginatedInfo)
{
    console.log()
    let page = label == "Previous" ? currentPage - 1 : currentPage + 1;
    let item = document.createElement('li');
    item.classList.add('page-item');
    paginatedInfo[`has${label}Page`] ? item.classList.remove('disabled') : item.classList.add('disabled');
    item.innerHTML = `
        <a class="page-link" onclick="listRooms(${page})">${label}</a>
    `;
    return item;
}

function PaginationItemComponent(page, currentPage)
{
    const item = document.createElement('li');
    item.classList.add('page-item');
    page === currentPage ? item.classList.add('active') : item.classList.remove('active');
    item.innerHTML = `
        <a class="page-link" onclick="listRooms(${page})">${page}</a>
    `;
    return item;
}

function RoomPaginationComponent(paginatedGroup, data)
{
    paginatedGroup.innerHTML = "";
    const paginatedInfo = data["paginatedItems"]
    let item = PaginationItemLabelComponent(paginatedInfo["currentPage"], "Previous", paginatedInfo);
    paginatedGroup.appendChild(item);

    const totalPages = paginatedInfo["totalPages"];
    const currentPage = paginatedInfo["currentPage"];

    const { startPage, endPage } = PaginationConfig(totalPages, currentPage);

    for (let page = startPage; page <= endPage; page++) {
        item = PaginationItemComponent(page, currentPage);
        paginatedGroup.appendChild(item);
    }

    item = PaginationItemLabelComponent(paginatedInfo["currentPage"], "Next", paginatedInfo);
    paginatedGroup.appendChild(item);
}

function PaginationConfig(totalPages, currentPage) {
    let startPage, endPage;

    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }
    return { startPage, endPage };
}

const PageComponent = {
    RoomPaginationComponent
}